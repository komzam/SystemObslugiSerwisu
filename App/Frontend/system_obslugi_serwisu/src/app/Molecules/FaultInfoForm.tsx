import {useTranslations} from "next-intl";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {LabeledTextArea} from "@/app/Molecules/LabeledTextArea";
import {LabeledSwitch} from "@/app/Molecules/LabeledSwitch";
import {BookRepairMutationVariables} from "@/__generated__/types";

type FaultInfoKey = keyof BookRepairMutationVariables["request"]["faultInfo"];

export type FaultInfoChangeHandler = <K extends FaultInfoKey>(
    fieldName: K,
    value: BookRepairMutationVariables["request"]["faultInfo"][K]
) => void;

export type FaultInfoFormProps = {
    formData: BookRepairMutationVariables["request"]["faultInfo"];
    onFormChange: FaultInfoChangeHandler;
}

export function FaultInfoForm({formData, onFormChange}: FaultInfoFormProps) {
    const t = useTranslations("RepairForm.faultInfo");

    return(
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="whenFaultOccured" label={t("whenFaultOccured")}
                              onChange={(e) => onFormChange("whenOccured", e.target.value)}/>
            <LabeledTextArea wrapperClassName="w-full" className="w-full" id={"howToReplicateFault"} label={t("howToReplicateFault")}
                             onChange={(e) => onFormChange("howToReproduce", e.target.value)}/>
            <LabeledTextArea wrapperClassName="w-full" className="w-full" id={"describeFault"} label={t("describeFault")}
                             onChange={(e) => onFormChange("description", e.target.value)}/>
            <div className="pl-2">
                <LabeledSwitch id="wasRepairedBefore" label={t("wasRepairedBefore")}
                               onChange={(checked) => onFormChange("previouslyRepaired", checked)}/>
            </div>
        </div>
    )
}