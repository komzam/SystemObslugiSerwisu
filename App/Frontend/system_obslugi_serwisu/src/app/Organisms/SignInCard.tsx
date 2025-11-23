"use client"

import {Card} from "@/app/Atoms/Card";
import {SignInChangeHandler, SignInForm} from "@/app/Molecules/SignInForm";
import {SignInButton} from "@/app/Molecules/SignInButton";
import {useTranslations} from "next-intl";
import { useState, FormEvent} from "react";
import {useMutation} from "@apollo/client/react";
import {LOGIN} from "@/graphql/Login";
import {useAuthContext} from "@/app/Utils/AuthContext";
import {HighlightColors, HighlightedText} from "@/app/Atoms/HighlightedText";
import {ErrorName} from "@/app/Utils/ErrorName";
import {LoginMutationVariables} from "@/__generated__/types";


export function SignInCard() {
    const t = useTranslations("SignIn");
    const tErr = useTranslations("Errors");
    const [formData, setFormData] = useState<LoginMutationVariables>({
        email: "",
        password: "",
        rememberMe: true
    });
    const [error, setError] = useState<string | null>(null);
    const [login] = useMutation(LOGIN);
    const authContext = useAuthContext();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await login({
                variables: formData
            });
            authContext.update();
        } catch (err: unknown) {
            setError(ErrorName(err, tErr));
        }
    }

    const onFormChange:SignInChangeHandler = (fieldName, value) =>
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