import {useTranslations} from "next-intl";
import {LabeledTextInput} from "@/components/Molecules/LabeledTextInput";
import {BookRepairMutationVariables, DeviceType} from "@/__generated__/types";
import {useRepairFormContext} from "@/components/Utils/RepairFormProvider";
import {LabeledDropdown} from "@/components/Molecules/LabeledDropdown";
import {DropdownItems} from "@/components/Molecules/Dropdown";
import {useMemo} from "react";

type DeviceInfoKey = keyof BookRepairMutationVariables["request"]["deviceInfo"];

export type DeviceInfoChangeHandler = <K extends DeviceInfoKey>(
    fieldName: K,
    value: BookRepairMutationVariables["request"]["deviceInfo"][K]
) => void;

export function DeviceInfoForm() {
    const t = useTranslations("RepairForm.deviceInfo");
    const tDevType = useTranslations("DeviceTypes");
    const repairFormContext = useRepairFormContext();
    const formData = repairFormContext.repairFormData.deviceInfo;

    const updateForm:DeviceInfoChangeHandler = (fieldName, value) => {
        repairFormContext.setRepairForm((prev) => ({ ...prev, deviceInfo:{ ...prev.deviceInfo, [fieldName]: value }}));
    };

    const deviceTypes : DropdownItems = useMemo(() => {
        const items: DropdownItems = [{values: []}];
        let i = 0;
        for (const key in DeviceType) {
            if (DeviceType.hasOwnProperty(key)) {
                const enumKey = key as keyof typeof DeviceType;
                items[0].values.push({
                    valueName: DeviceType[enumKey],
                    valueLabel: tDevType(key),
                });
                i++;
            }
        }
        return items;
    }, []);

    return(
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledDropdown classNamePortal="max-h-80" placeholder="" items={deviceTypes} label={t("deviceType")}
            value={formData.deviceType} onValueChange={(value) => { updateForm("deviceType", value as DeviceType);}}/>
            <div className="bg-inherit flex flex-col md:flex-row gap-5 w-full">
                <LabeledTextInput value={formData.manufacturer} wrapperClassName="w-full md:flex-1" className="w-full" id="manufacturer" label={t("manufacturer")}
                                  onChange={(e) => updateForm("manufacturer", e.target.value)} required={true}/>
                <LabeledTextInput value={formData.model} wrapperClassName="w-full md:flex-1" className="w-full" id="modelName" label={t("modelName")}
                                  onChange={(e) => updateForm("model", e.target.value)} required={true}/>
            </div>
            <LabeledTextInput value={formData.serialNumber} wrapperClassName="w-full" className="w-full" id="serialNumber" label={t("serialNumber")}
                              onChange={(e) => updateForm("serialNumber", e.target.value)} required={true}/>
        </div>
    )
}