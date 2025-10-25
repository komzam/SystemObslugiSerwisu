import {useTranslations} from "next-intl";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {LabeledDropdown} from "@/app/Molecules/LabeledDropdown";
import {DropdownItems} from "@/app/Molecules/Dropdown";
import {BookRepairMutationVariables, ContactMethod} from "@/__generated__/types";
import {PhoneInput} from "@/app/Molecules/PhoneInput";
import {useEffect, useMemo} from "react";
import {useAuthContext} from "@/app/Utils/AuthContext";
import {useRepairFormContext} from "@/app/Utils/RepairFormProvider";
import {DeviceInfoChangeHandler} from "@/app/Molecules/DeviceInfoForm";


type ContactInfoKey = keyof BookRepairMutationVariables["request"]["contactInfo"];

export type ContactInfoChangeHandler = <K extends ContactInfoKey>(
    fieldName: K,
    value: BookRepairMutationVariables["request"]["contactInfo"][K]
) => void;

export function ContactInfoForm() {
    const t = useTranslations("RepairForm.additionalInfo")
    const authContext = useAuthContext();
    const repairFormContext = useRepairFormContext();
    const formData = repairFormContext.repairFormData.contactInfo;

    const updateForm:ContactInfoChangeHandler = (fieldName, value) => {
        repairFormContext.setRepairForm((prev) => ({ ...prev, contactInfo:{ ...prev.contactInfo, [fieldName]: value }}));
    };

    const contactMethods : DropdownItems = useMemo(() => {
        const items: DropdownItems = [{values: []}];
        let i = 0;
        for (const key in ContactMethod) {
            if (ContactMethod.hasOwnProperty(key)) {
                const enumKey = key as keyof typeof ContactMethod;
                items[0].values.push({
                    valueName: ContactMethod[enumKey],
                    valueLabel: t("contactMethods." + key),
                });
                i++;
            }
        }
        return items;
    }, []);

    useEffect(() => {
        if(authContext.isLoggedIn && formData.email == ""){
            updateForm("fullName", authContext.authInfo?.name);
            updateForm("email", authContext.authInfo?.email);
            updateForm("phoneNumber", authContext.authInfo?.phone?? "");
            updateForm("phoneRegionCode", authContext.authInfo?.phoneRegionCode?? "PL");
            updateForm("preferredContactMethod", authContext.authInfo?.preferredContactMethod?? ContactMethod.Sms)
        }
    }, []);

    return (
        <div className="bg-inherit flex flex-col gap-5">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="fullName" label={t("fullName")}
                              disabled={authContext.isLoggedIn}
                              value={formData.fullName?? ""}
                              onChange={(e) => updateForm("fullName", e.target.value)}/>
            <div className="bg-inherit flex flex-col md:flex-row gap-5 w-full">
                <LabeledTextInput wrapperClassName="w-full md:flex-1" className="w-full" id="email" label={t("email")}
                                  disabled={authContext.isLoggedIn}
                                  value={formData.email?? ""}
                                  onChange={(e) => updateForm("email", e.target.value)}/>
                <PhoneInput wrapperClassName="w-full md:flex-1" className="w-full" id={"phoneNumber"} label={t("phoneNumber")}
                            countryCode={formData.phoneRegionCode} onCountryChange={(countryCode) => updateForm("phoneRegionCode", countryCode)}
                            phone={formData.phoneNumber} onPhoneChange={(phoneNumber) => updateForm("phoneNumber", phoneNumber)}/>
            </div>
            <LabeledDropdown placeholder="Select" items={contactMethods} label={t("preferredContactMethod")} value={formData.preferredContactMethod}
                onValueChange={(value) => { updateForm("preferredContactMethod", value as ContactMethod);}}/>
        </div>
    )
}