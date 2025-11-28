"use client";

import {useTranslations} from "next-intl";
import {Button} from "@/components/Atoms/Button";
import {LabeledText} from "@/components/Molecules/LabeledText";

export type PaymentProps = {
    finalAmount: string;
}

export function Payment({finalAmount}: PaymentProps) {
    const t = useTranslations("RepairDetails");

    return(
        <div className="flex flex-row px-2.5 py-4 gap-2 border-1 border-accent3 rounded-xl w-[clamp(20rem,80vw,40rem)]">
            <LabeledText wrapperClassName={"flex-1"} label={t("finalAmount")} className="text-primary font-bold">{finalAmount}</LabeledText>
            <Button>{t("payNow")}</Button>
        </div>
    )
}