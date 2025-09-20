import {useTranslations} from "next-intl";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {LabeledTextArea} from "@/app/Molecules/LabeledTextArea";
import {LabeledSwitch} from "@/app/Molecules/LabeledSwitch";

export function FaultInfoForm() {
    const t = useTranslations("RepairForm.faultInfo");

    return(
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="whenFaultOccured" label={t("whenFaultOccured")}/>
            <LabeledTextArea wrapperClassName="w-full" className="w-full" id={"howToReplicateFault"} label={t("howToReplicateFault")}/>
            <LabeledTextArea wrapperClassName="w-full" className="w-full" id={"describeFault"} label={t("describeFault")}/>
            <div className="pl-2">
                <LabeledSwitch id="wasRepairedBefore" label={t("wasRepairedBefore")}/>
            </div>
        </div>
    )
}