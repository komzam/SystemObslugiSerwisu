import {useTranslations} from "next-intl";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {BookRepairMutationVariables, DeviceType} from "@/__generated__/types";

type DeviceInfoKey = keyof BookRepairMutationVariables["request"]["deviceInfo"];

export type DeviceInfoChangeHandler = <K extends DeviceInfoKey>(
    fieldName: K,
    value: BookRepairMutationVariables["request"]["deviceInfo"][K]
) => void;

export type DeviceInfoFormProps = {
    formData: BookRepairMutationVariables["request"]["deviceInfo"];
    onFormChange: DeviceInfoChangeHandler;
}

export function DeviceInfoForm({formData, onFormChange}: DeviceInfoFormProps) {
    const t = useTranslations("RepairForm.deviceInfo");

    return(
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledTextInput value={formData.deviceType} wrapperClassName="w-full" className="w-full" id="deviceType" label={t("deviceType")}
                onChange={(e) => onFormChange("deviceType", DeviceType.Desktop)}/>
            <div className="bg-inherit flex flex-col md:flex-row gap-5 w-full">
                <LabeledTextInput value={formData.manufacturer} wrapperClassName="w-full md:flex-1" className="w-full" id="manufacturer" label={t("manufacturer")}
                                  onChange={(e) => onFormChange("manufacturer", e.target.value)}/>
                <LabeledTextInput value={formData.model} wrapperClassName="w-full md:flex-1" className="w-full" id="modelName" label={t("modelName")}
                                  onChange={(e) => onFormChange("model", e.target.value)}/>
            </div>
            <LabeledTextInput value={formData.serialNumber} wrapperClassName="w-full" className="w-full" id="serialNumber" label={t("serialNumber")}
                              onChange={(e) => onFormChange("serialNumber", e.target.value)}/>
        </div>
    )
}