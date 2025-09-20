import {RepairFormCard, RepairFormCardProps} from "@/app/Molecules/RepairFormCard";
import {useTranslations} from "next-intl";
import {DeviceInfoForm} from "@/app/Molecules/DeviceInfoForm";

type FormProps = Omit<RepairFormCardProps, 'title'>

export function RepairFormDevInfo({...props}: FormProps) {
    const t = useTranslations("RepairForm.deviceInfo");
    return (
        <RepairFormCard title={t("title")} {...props}>
            <DeviceInfoForm/>
        </RepairFormCard>
    )
}