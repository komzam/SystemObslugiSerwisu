import {useTranslations} from "next-intl";
import {LabeledPasswordInput} from "@/app/Molecules/LabeledPasswordInput";
import {Button} from "@/app/Atoms/Button";

export function ChangePasswordForm() {
    const tEA = useTranslations("EditAccount");
    const tAD = useTranslations("EditAccount.accountDetails");

    return (
        <div className="bg-inherit flex flex-col gap-5">
            <LabeledPasswordInput wrapperClassName="w-full" className="w-full" label={tAD("oldPassword")} id="oldPassword"/>
            <LabeledPasswordInput wrapperClassName="w-full" className="w-full" label={tAD("newPassword")} id="newPassword"/>
            <LabeledPasswordInput wrapperClassName="w-full" className="w-full" label={tAD("repeatNewPassword")} id="repeatNewPassword"/>
            <Button>{tEA("change")}</Button>
        </div>
    )
}