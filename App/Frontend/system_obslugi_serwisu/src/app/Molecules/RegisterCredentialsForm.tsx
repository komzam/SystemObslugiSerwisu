import { useTranslations} from "next-intl";
import { LabeledTextInput } from "@/app/Molecules/LabeledTextInput";

export function RegisterCredentialsForm() {
    const t = useTranslations("Register");

    return(
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="email" label={t("email")}/>
            <div className="bg-inherit flex flex-col md:flex-row gap-5 w-full">
                <LabeledTextInput wrapperClassName="w-full md:flex-1" className="w-full" id="password" label={t("password")}/>
                <LabeledTextInput wrapperClassName="w-full md:flex-1" className="w-full" id="repeatPassword" label={t("repeatPassword")}/>
            </div>
        </div>
    )
}