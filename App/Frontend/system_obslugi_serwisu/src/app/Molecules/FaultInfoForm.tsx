import {useTranslations} from "next-intl";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {LabeledTextArea} from "@/app/Molecules/LabeledTextArea";
import {LabeledSwitch} from "@/app/Molecules/LabeledSwitch";
import {BookRepairMutationVariables} from "@/__generated__/types";
import {useRepairFormContext} from "@/app/Utils/RepairFormProvider";

type FaultInfoKey = keyof BookRepairMutationVariables["request"]["faultInfo"];

export type FaultInfoChangeHandler = <K extends FaultInfoKey>(
    fieldName: K,
    value: BookRepairMutationVariables["request"]["faultInfo"][K]
) => void;

export function FaultInfoForm() {
    const t = useTranslations("RepairForm.faultInfo");
    const repairFormContext = useRepairFormContext();
    const formData = repairFormContext.repairFormData.faultInfo;

    const updateForm:FaultInfoChangeHandler = (fieldName, value) => {
        repairFormContext.setRepairForm((prev) => ({ ...prev, faultInfo:{ ...prev.faultInfo, [fieldName]: value }}));
    };

    return(
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="whenFaultOccurred" label={t("whenFaultOccurred")} value={formData.whenOccurred}
                              onChange={(e) => updateForm("whenOccurred", e.target.value)} required={true}/>
            <LabeledTextArea wrapperClassName="w-full" className="w-full" id={"howToReplicateFault"} label={t("howToReplicateFault")} value={formData.howToReproduce}
                             onChange={(e) => updateForm("howToReproduce", e.target.value)} required={true}/>
            <LabeledTextArea wrapperClassName="w-full" className="w-full" id={"describeFault"} label={t("describeFault")} value={formData.description}
                             onChange={(e) => updateForm("description", e.target.value)} required={true}/>
            <div className="pl-2">
                <LabeledSwitch id="wasRepairedBefore" label={t("wasRepairedBefore")} checked={formData.previouslyRepaired}
                               onChange={(checked) => updateForm("previouslyRepaired", checked)}/>
            </div>
        </div>
    )
}