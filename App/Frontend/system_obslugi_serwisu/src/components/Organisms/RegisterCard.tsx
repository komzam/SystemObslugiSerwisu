"use client"

import {Card} from "@/components/Atoms/Card";
import {AccountType, RegisterForm, RegisterFormData} from "@/components/Molecules/RegisterForm";
import {HorizontalSelect, HorizontalSelectOption} from "@/components/Molecules/HortizontalSelect";

import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";

import {Button} from "@/components/Atoms/Button";
import {useMutation} from "@apollo/client/react";
import {REGISTER} from "@/graphql/Register";

import { useState, FormEvent } from "react";
import {HighlightColors, HighlightedText} from "@/components/Atoms/HighlightedText";
import {ErrorName} from "@/components/Utils/ErrorName";

export function RegisterCard() {
    const t = useTranslations("Register");
    const tErr = useTranslations("Errors");
    const [accountType, SetAccountType] = useState<AccountType>("normal");
    const [error, setError] = useState<string | null>(null);
    const accountTypes : HorizontalSelectOption[] = [
        {value: "normal", label:t("normalAccount")},
        {value: "business", label:t("businessAccount")}
    ];
    const [formData, setFormData] = useState<RegisterFormData>({
        email: "",
        password: "",
        repeatPassword: "",
        isBusiness: false,
        firstName: "",
        lastName: "",
        companyName: "",
        taxIdNumber: ""
    });

    const onFormChange = (fieldName: string, value: string) =>
    {
        setFormData((prev) => ({ ...prev, [fieldName]: value }))
    };

    const accountTypeChanged = (selected: number|null) => {
        if(selected == null)
            return;
        const selectedValue : AccountType = accountTypes[selected].value as AccountType;
        SetAccountType(selectedValue);
        setFormData((formData) => ({ ...formData, isBusiness: selectedValue == "business"}));
        if(selectedValue == "business") {
            onFormChange("firstName", "");
            onFormChange("lastName", "");
        }else{
            onFormChange("companyName", "");
        }
    };

    const [register] = useMutation(REGISTER);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(formData.password != formData.repeatPassword) {
            setError(tErr("Identity.PasswordMismatch"));
            return;
        }

        try {
            await register({
                variables: formData
            });
            router.push("/signIn");
        } catch (err: unknown) {
            setError(ErrorName(err, tErr));
        }
    }


    return (
        <Card className="w-lg flex flex-col justify-center items-center">
            <span className="text-larger2 font-bold text-center mb-5">{t("registerTitle")}</span>
            <HorizontalSelect className="mb-10" options={accountTypes} onChangeAction={accountTypeChanged} />
            {error != null && <HighlightedText className="w-full wrap-break-word mb-2" color={HighlightColors.Red}>{error}</HighlightedText>}
            <form className="bg-inherit w-full flex flex-col justify-center items-center gap-10" onSubmit={handleSubmit}>
                <RegisterForm accountType={accountType} formData={formData} onFormChange={onFormChange}/>
                <Button className="w-full" type="submit">{t("registerButton")}</Button>
            </form>
        </Card>
    );
}