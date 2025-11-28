import {LabeledTextInput} from "@/components/Molecules/LabeledTextInput";
import {useTranslations} from "next-intl";
import {LabeledPasswordInput} from "@/components/Molecules/LabeledPasswordInput";
import {LabeledSwitch} from "@/components/Molecules/LabeledSwitch";
import {LoginMutationVariables} from "@/__generated__/types";

type SignInKey = keyof LoginMutationVariables;

export type SignInChangeHandler = <K extends SignInKey>(
    fieldName: K,
    value: LoginMutationVariables[K]
) => void;

export type SignUpFormProps = {
    formData: LoginMutationVariables;
    onFormChange: SignInChangeHandler;
}

export function SignInForm({formData, onFormChange}: SignUpFormProps) {
    const t = useTranslations("SignIn");

    return (
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="email" type="email" value={formData.email}
                              onChange={(e) => onFormChange("email", e.target.value)} label={t("email")} />
            <LabeledPasswordInput wrapperClassName="w-full" className="w-full" id="password" value={formData.password}
                                  onChange={(e) => onFormChange("password", e.target.value)} label={t("password")}/>
            <LabeledSwitch id="rememberMe" label={t("rememberMe")} labelPos="right" checked={formData.rememberMe}
                           onChange={(checked) => onFormChange("rememberMe", checked)}/>
        </div>
    );
}