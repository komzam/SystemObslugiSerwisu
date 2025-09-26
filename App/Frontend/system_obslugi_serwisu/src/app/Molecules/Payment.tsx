"use client";

import {useTranslations} from "next-intl";
import {KeyValueList} from "@/app/Molecules/KeyValueList";
import {KeyValueLineProps} from "@/app/Molecules/KeyValueLine";
import {HighlightColors, HighlightedText} from "@/app/Atoms/HighlightedText";
import {Button} from "@/app/Atoms/Button";
import {useState} from "react";
import {LabeledText} from "@/app/Molecules/LabeledText";

export type PaymentProps = {
    finalAmount: number;
}

export function Payment({finalAmount}: PaymentProps) {
    const t = useTranslations("RepairDetails");

    return(
        <div className="flex flex-row px-2.5 py-4 gap-2 border-1 border-accent3 rounded-xl w-[clamp(20rem,80vw,40rem)]">
            <LabeledText wrapperClassName={"flex-1"} label={t("finalAmount")} className="text-primary font-bold">{finalAmount.toFixed(2)}</LabeledText>
            <Button>{t("payNow")}</Button>
        </div>
    )
}