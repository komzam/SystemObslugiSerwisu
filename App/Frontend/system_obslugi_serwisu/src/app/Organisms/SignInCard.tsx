"use client"

import {Card} from "@/app/Atoms/Card";
import {SignInForm, SignInFormData} from "@/app/Molecules/SignInForm";
import {SignInButton} from "@/app/Molecules/SignInButton";
import {useTranslations} from "next-intl";
import {createRef, useState, FormEvent} from "react";
import {useMutation} from "@apollo/client/react";
import {LOGIN} from "@/graphql/Login";
import {CombinedGraphQLErrors} from "@apollo/client/errors";
import {useAuthContext} from "@/app/Utils/AuthContext";
import {useRouter} from "@/i18n/navigation";
import {HighlightColors, HighlightedText} from "@/app/Atoms/HighlightedText";

export function SignInCard() {
    const t = useTranslations("SignIn");
    const tErr = useTranslations("Errors");
    const [formData, setFormData] = useState<SignInFormData>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [login] = useMutation(LOGIN);
    const authContext = useAuthContext();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await login({
                variables: formData
            });
            authContext.update();
            router.push("/");
        } catch (err: unknown) {
            if (CombinedGraphQLErrors.is(err)) {
                const code = err.errors[0].extensions?.code as string | undefined;
                if(!code)
                    setError(tErr("generalError"));
                else if (tErr.has(code))
                    setError(tErr(code));
                else
                    setError(tErr("generalError"));
            }else{
                setError(tErr("generalError"));
            }
        }
    }

    const onFormChange = (fieldName: string, value: string) =>
    {
        setFormData((prev) => ({ ...prev, [fieldName]: value }))
    };

    return (
        <Card className="flex flex-col justify-center items-center w-lg">
            <span className="text-larger2 font-bold text-center mb-10">{t("signInTitle")}</span>
            {error != null && <HighlightedText className="w-full wrap-break-word mb-2" color={HighlightColors.Red}>{error}</HighlightedText>}
            <form className="bg-inherit flex flex-col justify-center items-center gap-10 w-full" onSubmit={handleSubmit}>
                <SignInForm formData={formData} onFormChange={onFormChange} />
                <SignInButton/>
            </form>
        </Card>
    );
}