import {RepairFormCard, RepairFormCardProps} from "@/components/Molecules/RepairFormCard";
import {useTranslations} from "next-intl";
import {DeviceInfoForm} from "@/components/Molecules/DeviceInfoForm";

type FormProps = Omit<RepairFormCardProps, 'title'>;

export function RepairFormDevInfo({...props}: FormProps) {
    const t = useTranslations("RepairForm.deviceInfo");
    return (
        <RepairFormCard title={t("title")} {...props}>
            <DeviceInfoForm/>
        </RepairFormCard>
    )
}