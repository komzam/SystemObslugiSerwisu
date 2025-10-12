import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {useTranslations} from "next-intl";

export type SignInFormData = {
    email: string;
    password: string;
}

export type SignUpFormProps = {
    formData: SignInFormData;
    onFormChange: (fieldName: string, value: string) => void;
}

export function SignInForm({formData, onFormChange}: SignUpFormProps) {
    const t = useTranslations("SignIn");

    return (
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="email" type="email" value={formData.email}
                              onChange={(e) => onFormChange("email", e.target.value)} label={t("email")} />
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="password" type="password" value={formData.password}
                              onChange={(e) => onFormChange("password", e.target.value)} label={t("password")} />
        </div>
    );
}