import {LabeledPasswordInput} from "@/app/Molecules/LabeledPasswordInput";
import {useTranslations} from "next-intl";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {ChangeEmailMutationVariables} from "@/__generated__/types";

type ChangeEmailKey = keyof ChangeEmailMutationVariables;
export type ChangeEmailChangeHandler = <K extends ChangeEmailKey>(
    fieldName: K,
    value: ChangeEmailMutationVariables[K]
) => void;

export type ChangeEmailFormProps = {
    formData: ChangeEmailMutationVariables;
    onFormChange: ChangeEmailChangeHandler;
}

export function ChangeEmailForm({formData, onFormChange}: ChangeEmailFormProps) {
    const t = useTranslations("EditAccount.accountDetails");

    return (
        <div className="bg-inherit flex flex-col gap-5">
            <LabeledPasswordInput wrapperClassName="w-full" className="w-full" label={t("password")} id="password"
                                  value={formData.password} onChange={(e) => onFormChange("password", e.target.value)}/>
            <LabeledTextInput wrapperClassName="w-full" className="w-full" label={t("newEmail")} id="newEmail"
                              value={formData.newEmail} onChange={(e) => onFormChange("newEmail", e.target.value)}/>
        </div>
    )
}