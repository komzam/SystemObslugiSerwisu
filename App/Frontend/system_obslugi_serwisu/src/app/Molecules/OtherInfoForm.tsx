import {useTranslations} from "next-intl";
import {LabeledTextArea} from "@/app/Molecules/LabeledTextArea";
import {useRepairFormContext} from "@/app/Utils/RepairFormProvider";
import {BookRepairMutationVariables} from "@/__generated__/types";

export type OtherInfoChangeHandler = <K extends keyof BookRepairMutationVariables["request"]>(
    fieldName: K,
    value: BookRepairMutationVariables["request"][K]
) => void;

export function OtherInfoForm() {
    const t = useTranslations("RepairForm.additionalInfo")
    const repairFormContext = useRepairFormContext();
    const formData = repairFormContext.repairFormData;

    const updateForm:OtherInfoChangeHandler = (fieldName, value) => {
        repairFormContext.setRepairForm((prev) => ({ ...prev, [fieldName]: value}));
    };

    return (
        <div className="bg-inherit">
            {/*<LabeledTextInput wrapperClassName="w-full" className="w-full" id="deviceLoginInfo" label={t("deviceLoginInfo")} description={t("deviceLoginInfoDesc")}/>*/}
            <LabeledTextArea wrapperClassName="w-full" className="w-full" id="additionalComments" label={t("additionalComments")}
                value={formData.additionalComment??""} onChange={(e)=> updateForm("additionalComment", e.target.value)}/>
        </div>
    )
}