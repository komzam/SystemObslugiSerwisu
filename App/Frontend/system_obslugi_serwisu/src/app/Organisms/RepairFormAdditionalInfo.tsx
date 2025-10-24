import {RepairFormCard, RepairFormCardProps} from "@/app/Molecules/RepairFormCard";
import {useTranslations} from "next-intl";
import {AdditionalInfoForm, AdditionalInfoFormProps} from "@/app/Molecules/AdditionalInfoForm";

type FormProps = AdditionalInfoFormProps & Omit<RepairFormCardProps, 'title'>;

export function RepairFormAdditionalInfo({formData, onFormChange, ...props} : FormProps) {
    const t = useTranslations("RepairForm.additionalInfo");
    return (
        <RepairFormCard title={t("title")} {...props}>
            <AdditionalInfoForm formData={formData} onFormChange={onFormChange} />
        </RepairFormCard>
    )
}