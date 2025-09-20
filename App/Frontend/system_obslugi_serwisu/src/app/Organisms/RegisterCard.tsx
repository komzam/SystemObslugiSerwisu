import {Card} from "@/app/Atoms/Card";
import {AddressForm} from "@/app/Molecules/AddressForm";
import {RegisterCredentialsForm} from "@/app/Molecules/RegisterCredentialsForm";
import {useTranslations} from "next-intl";
import * as React from "react";
import {RegisterAccountType} from "@/app/Molecules/RegisterAccountType";
import {Button} from "@/app/Atoms/Button";

export function RegisterCard() {
    const t = useTranslations("Register");

    return (
        <Card className="flex flex-col justify-center items-center gap-10 w-lg">
            <span className="text-larger2 font-bold text-center">{t("registerTitle")}</span>
            <RegisterCredentialsForm />
            <RegisterAccountType/>
            <Button className="w-full">{t("registerButton")}</Button>
        </Card>
    );
}