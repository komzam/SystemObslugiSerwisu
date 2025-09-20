import {useTranslations} from "next-intl";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";

export function DeviceInfoForm() {
    const t = useTranslations("RepairForm.deviceInfo");

    return(
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="deviceType" label={t("deviceType")}/>
            <div className="bg-inherit flex flex-col md:flex-row gap-5 w-full">
                <LabeledTextInput wrapperClassName="w-full md:flex-1" className="w-full" id="manufacturer" label={t("manufacturer")}/>
                <LabeledTextInput wrapperClassName="w-full md:flex-1" className="w-full" id="modelName" label={t("modelName")}/>
            </div>
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="serialNumber" label={t("serialNumber")}/>
        </div>
    )
}