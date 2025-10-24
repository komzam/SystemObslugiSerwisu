import {RepairFormCard, RepairFormCardProps} from "@/app/Molecules/RepairFormCard";
import {useTranslations} from "next-intl";
import {FaultInfoForm, FaultInfoFormProps} from "@/app/Molecules/FaultInfoForm";

type FormProps = FaultInfoFormProps & Omit<RepairFormCardProps, 'title'>;

export function RepairFormFaultInfo({formData, onFormChange, ...props}:FormProps) {
    const t = useTranslations("RepairForm.faultInfo");
    return (
        <RepairFormCard title={t("title")} {...props}>
            <FaultInfoForm formData={formData} onFormChange={onFormChange}/>
        </RepairFormCard>
    )
}