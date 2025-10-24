import {useTranslations} from "next-intl";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {LabeledDropdown} from "@/app/Molecules/LabeledDropdown";
import {DropdownItems} from "@/app/Molecules/Dropdown";
import {BookRepairMutationVariables, ContactMethod} from "@/__generated__/types";
import {PhoneInput} from "@/app/Molecules/PhoneInput";
import {useMemo} from "react";
import {useAuthContext} from "@/app/Utils/AuthContext";


type ContactInfoKey = keyof BookRepairMutationVariables["request"]["contactInfo"];

export type ContactInfoChangeHandler = <K extends ContactInfoKey>(
    fieldName: K,
    value: BookRepairMutationVariables["request"]["contactInfo"][K]
) => void;

export type ContactInfoFormProps = {
    formData: BookRepairMutationVariables["request"]["contactInfo"];
    onFormChange: ContactInfoChangeHandler;
}

export function ContactInfoForm({formData, onFormChange}: ContactInfoFormProps) {
    const t = useTranslations("RepairForm.additionalInfo")
    const authContext = useAuthContext();

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

    return (
        <div className="bg-inherit flex flex-col gap-5">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="fullName" label={t("fullName")}
                              disabled={authContext.isLoggedIn}
                              value={(authContext.isLoggedIn ? authContext.authInfo?.name : formData.fullName) ?? ''}
                              onChange={(e) => onFormChange("fullName", e.target.value)}/>
            <div className="bg-inherit flex flex-col md:flex-row gap-5 w-full">
                <LabeledTextInput wrapperClassName="w-full md:flex-1" className="w-full" id="email" label={t("email")}
                                  disabled={authContext.isLoggedIn}
                                  value={(authContext.isLoggedIn ? authContext.authInfo?.email : formData.email) ?? ''}
                                  onChange={(e) => onFormChange("email", e.target.value)}/>
                <PhoneInput wrapperClassName="w-full md:flex-1" className="w-full" id={"phoneNumber"} label={t("phoneNumber")}
                            countryCode={formData.phoneRegionCode} onCountryChange={(countryCode) => onFormChange("phoneRegionCode", countryCode)}
                            phone={formData.phoneNumber} onPhoneChange={(phoneNumber) => onFormChange("phoneNumber", phoneNumber)}/>
            </div>
            <LabeledDropdown placeholder="Select" items={contactMethods} label={t("preferredContactMethod")}
                onValueChange={(value) => {
                    ContactMethod.hasOwnProperty(value) && onFormChange("preferredContactMethod", value as ContactMethod);
                }}/>
        </div>
    )
}