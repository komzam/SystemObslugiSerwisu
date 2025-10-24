import {RepairFormCard, RepairFormCardProps} from "@/app/Molecules/RepairFormCard";
import {useTranslations} from "next-intl";
import {DeviceInfoForm, DeviceInfoFormProps} from "@/app/Molecules/DeviceInfoForm";

type FormProps = DeviceInfoFormProps & Omit<RepairFormCardProps, 'title'>;

export function RepairFormDevInfo({formData, onFormChange, ...props}: FormProps) {
    const t = useTranslations("RepairForm.deviceInfo");
    return (
        <RepairFormCard title={t("title")} {...props}>
            <DeviceInfoForm formData={formData} onFormChange={onFormChange}/>
        </RepairFormCard>
    )
}