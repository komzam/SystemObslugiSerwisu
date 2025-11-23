import {useTranslations} from "next-intl";
import {LabeledPasswordInput} from "@/app/Molecules/LabeledPasswordInput";

export type ChangePasswordForm = {
    currentPassword: string;
    newPassword: string;
    repeatNewPassword: string;
}

type ChangePasswordKey = keyof ChangePasswordForm;
export type ChangePasswordChangeHandler = <K extends ChangePasswordKey>(
    fieldName: K,
    value: ChangePasswordForm[K]
) => void;

export type ChangePasswordFormProps = {
    formData: ChangePasswordForm;
    onFormChange: ChangePasswordChangeHandler;
}

export function ChangePasswordForm({formData, onFormChange}: ChangePasswordFormProps) {
    const t = useTranslations("EditAccount.accountDetails");

    return (
        <div className="bg-inherit flex flex-col gap-5">
            <LabeledPasswordInput wrapperClassName="w-full" className="w-full" label={t("currentPassword")} id="currentPassword"
                                  value={formData.currentPassword} onChange={(e) => onFormChange("currentPassword", e.target.value)} />
            <LabeledPasswordInput wrapperClassName="w-full" className="w-full" label={t("newPassword")} id="newPassword"
                                  value={formData.newPassword} onChange={(e) => onFormChange("newPassword", e.target.value)}/>
            <LabeledPasswordInput wrapperClassName="w-full" className="w-full" label={t("repeatNewPassword")} id="repeatNewPassword"
                                  value={formData.repeatNewPassword} onChange={(e) => onFormChange("repeatNewPassword", e.target.value)}/>
        </div>
    )
}