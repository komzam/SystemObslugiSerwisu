import {RepairFormCard, RepairFormCardProps} from "@/app/Molecules/RepairFormCard";
import {useTranslations} from "next-intl";
import {AdditionalInfoForm} from "@/app/Molecules/AdditionalInfoForm";

type FormProps = Omit<RepairFormCardProps, 'title'>

export function RepairFormAdditionalInfo({...props} : FormProps) {
    const t = useTranslations("RepairForm.additionalInfo");
    return (
        <RepairFormCard title={t("title")} {...props}>
            <AdditionalInfoForm/>
        </RepairFormCard>
    )
}