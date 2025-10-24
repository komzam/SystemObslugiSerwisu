import {useTranslations} from "next-intl";
import {ContactInfoForm} from "@/app/Molecules/ContactInfoForm";
import {ReturnInfoForm} from "@/app/Molecules/ReturnInfoForm";
import {OtherInfoForm} from "@/app/Molecules/OtherInfoForm";
import {BookRepairMutationVariables} from "@/__generated__/types";

export type AdditionalInfoForm = {
    contactInfo: BookRepairMutationVariables["request"]["contactInfo"];
    returnInfo: BookRepairMutationVariables["request"]["returnInfo"];
}

type AdditionalInfoKey = keyof AdditionalInfoForm;

export type AdditionalInfoChangeHandler = <K extends AdditionalInfoKey>(
    fieldName: K,
    value: AdditionalInfoForm[K]
) => void;

export type AdditionalInfoFormProps = {
    formData: AdditionalInfoForm;
    onFormChange: AdditionalInfoChangeHandler;
}

export function AdditionalInfoForm({formData, onFormChange}: AdditionalInfoFormProps) {
    const t = useTranslations("RepairForm.additionalInfo");

    return(
        <div className="bg-inherit flex flex-col gap-7 w-full">
            <div className="bg-inherit">
                <span className="text-larger2 font-bold">{t("contactInformation")}</span>
                <ContactInfoForm formData={formData.contactInfo}
                                 onFormChange={(fieldName, value) => onFormChange("contactInfo", { ...formData.contactInfo, [fieldName]: value })}/>
            </div>
            <div className="bg-inherit">
                <span className="text-larger2 font-bold">{t("returnInformation")}</span>
                <ReturnInfoForm/>
            </div>
            <div className="bg-inherit">
                <span className="text-larger2 font-bold">{t("otherInformation")}</span>
                <OtherInfoForm/>
            </div>
        </div>
    )
}