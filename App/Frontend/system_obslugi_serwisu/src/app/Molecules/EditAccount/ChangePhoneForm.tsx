import {LabeledPasswordInput} from "@/app/Molecules/LabeledPasswordInput";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {Button} from "@/app/Atoms/Button";
import {useTranslations} from "next-intl";

export function ChangePhoneForm(){
    const tEA = useTranslations("EditAccount");
    const tAD = useTranslations("EditAccount.accountDetails");

    return (
        <div className="bg-inherit flex flex-col gap-5">
            <LabeledPasswordInput wrapperClassName="w-full" className="w-full" label={tAD("password")} id="password"/>
            <LabeledTextInput wrapperClassName="w-full" className="w-full" label={tAD("newPhoneNumber")} id="newEmail"/>
            <Button>{tEA("change")}</Button>
        </div>
    )
}