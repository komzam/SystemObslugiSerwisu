"use client"

import {Card} from "@/app/Atoms/Card";
import {HorizontalSelect, HorizontalSelectOption} from "@/app/Molecules/HortizontalSelect";
import {useTranslations} from "next-intl";
import {ChangePasswordForm} from "@/app/Molecules/EditAccount/ChangePasswordForm";
import {useState} from "react";
import {ChangeEmailForm} from "@/app/Molecules/EditAccount/ChangeEmailForm";
import {ChangePhoneForm} from "@/app/Molecules/EditAccount/ChangePhoneForm";

export function EditAccountDetails(){
    const t = useTranslations("EditAccount.accountDetails");
    const [selected, setSelected] = useState<number|null>(null);

    const options: HorizontalSelectOption[] = [
        {label:t("changePassword"), value:"password"},
        {label:t("changeEmail"), value:"email"},
        {label:t("changePhoneNumber"), value:"phone"}
    ];

    return (
        <Card>
            <Card.Label>{t("title")}</Card.Label>
            <div className="bg-inherit flex flex-col gap-5 w-fit">
                <HorizontalSelect options={options} mustBeSelected={false} onChangeAction={(selected) => setSelected(selected)} />
                {selected!=null && options[selected].value == "password" && <ChangePasswordForm/>}
                {selected!=null && options[selected].value == "email" && <ChangeEmailForm/>}
                {selected!=null && options[selected].value == "phone" && <ChangePhoneForm/>}
            </div>
        </Card>
    )
}