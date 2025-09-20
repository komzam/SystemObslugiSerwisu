import {RepairFormCard, RepairFormCardProps} from "@/app/Molecules/RepairFormCard";
import {useTranslations} from "next-intl";
import {FaultInfoForm} from "@/app/Molecules/FaultInfoForm";

type FormProps = Omit<RepairFormCardProps, 'title'>

export function RepairFormFaultInfo({...props}:FormProps) {
    const t = useTranslations("RepairForm.faultInfo");
    return (
        <RepairFormCard title={t("title")} {...props}>
            <FaultInfoForm/>
        </RepairFormCard>
    )
}