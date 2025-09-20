import {Card} from "@/app/Atoms/Card";
import {SignInForm} from "@/app/Molecules/SignInForm";
import {SignInButton} from "@/app/Molecules/SignInButton";
import {useTranslations} from "next-intl";
import * as React from "react";

export function SignInCard() {
    const t = useTranslations("SignIn");

    return (
        <Card className="flex flex-col justify-center items-center gap-10 w-lg">
            <span className="text-larger2 font-bold text-center">{t("signInTitle")}</span>
            <SignInForm/>
            <SignInButton/>
        </Card>
    );
}