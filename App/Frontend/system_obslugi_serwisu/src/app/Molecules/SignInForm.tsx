import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {useTranslations} from "next-intl";

export function SignInForm() {
    const t = useTranslations("SignIn");

    return (
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="email" label={t("email")} />
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="password" label={t("password")} />
        </div>
    );
}