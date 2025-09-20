"use client"

import {LabeledSwitch} from "@/app/Molecules/LabeledSwitch";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {useTranslations} from "next-intl";
import {useState} from "react";

export function RegisterAccountType() {
    const [ showTin, setShowTin ] = useState<boolean>(false);
    const t = useTranslations("Register");

    const onChange = (checked: boolean) => {
        setShowTin(checked);
    }

    return (
        <div className="bg-inherit flex flex-col gap-3 w-full">
            <LabeledSwitch onChange={onChange} id="businessAccount" label={t("businessAccount")}/>
            <LabeledTextInput wrapperClassName={`w-full ${showTin? "" : "hidden"}`} className="w-full" id="tin" label={t("tin")}/>
        </div>
    )
}