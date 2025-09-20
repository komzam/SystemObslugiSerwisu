import {useTranslations} from "next-intl";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {LabeledTextArea} from "@/app/Molecules/LabeledTextArea";


export function OtherInfoForm() {
    const t = useTranslations("RepairForm.additionalInfo")

    return (
        <div className="bg-inherit">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="deviceLoginInfo" label={t("deviceLoginInfo")} description={t("deviceLoginInfoDesc")}/>
            <LabeledTextArea wrapperClassName="w-full" className="w-full" id="additionalComments" label={t("additionalComments")} />
        </div>
    )
}