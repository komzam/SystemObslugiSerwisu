"use client"

import {Card} from "@/app/Atoms/Card";
import {HorizontalSelect, HorizontalSelectOption} from "@/app/Molecules/HortizontalSelect";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {ChangePassword} from "@/app/Organisms/EditAccount/ChangePassword";
import {ChangeEmail} from "@/app/Organisms/EditAccount/ChangeEmail";
import {LuMail, LuPhone} from "react-icons/lu";
import {useAuthContext} from "@/app/Utils/AuthContext";
import {ChangePhoneNumber} from "@/app/Organisms/EditAccount/ChangePhoneNumber";

export function EditAccountDetails(){
    const t = useTranslations("EditAccount.accountDetails");
    const authContext = useAuthContext();
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
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-1 items-center">
                        <LuMail size="1.25rem"/><p>{t("email")}</p>
                    </div>
                    <p className="font-black">{authContext.authInfo?.__typename === "FullCustomerDto" && authContext.authInfo.email}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-1 items-center">
                        <LuPhone size="1.25rem"/><p>{t("phoneNumber")}</p>
                    </div>
                    <p className="font-black">{authContext.authInfo?.__typename === "FullCustomerDto" && (authContext.authInfo.phone??"-")}</p>
                </div>
                <HorizontalSelect options={options} mustBeSelected={false} onChangeAction={(selected) => setSelected(selected)} />
                {selected!=null && options[selected].value == "password" && <ChangePassword/>}
                {selected!=null && options[selected].value == "email" && <ChangeEmail/>}
                {selected!=null && options[selected].value == "phone" && <ChangePhoneNumber/>}
            </div>
        </Card>
    )
}