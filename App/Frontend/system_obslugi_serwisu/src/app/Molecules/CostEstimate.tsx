"use client";

import {useTranslations} from "next-intl";
import {KeyValueList} from "@/app/Molecules/KeyValueList";
import {KeyValueLineProps} from "@/app/Molecules/KeyValueLine";
import {HighlightColors, HighlightedText} from "@/app/Atoms/HighlightedText";
import {Button} from "@/app/Atoms/Button";
import {useState} from "react";

export type CostEstimateProps = {
    partsCost: string;
    laborCost: string;
    totalCost: string;
    state?: "pending" | "approved" | "cancelled";
}

export function CostEstimate({partsCost, laborCost, totalCost, state="pending"}: CostEstimateProps) {
    const t = useTranslations("RepairDetails");
    const [internalState, setInternalState] = useState<"pending" | "approved" | "cancelled">(state);

    const estimateList: KeyValueLineProps[] = [
        {label: t("parts"), value: partsCost, valueBold:true},
        {label: t("labor"), value: laborCost, valueBold:true},
        {label: t("totalEstimate"), value: totalCost, labelBold:true, valueBold:true}
    ]

    return(
        <div className="flex flex-col px-2.5 py-4 gap-2 border-1 border-accent3 rounded-xl w-[clamp(20rem,80vw,40rem)]">
            <p className="font-bold">{t("costEstimate")}</p>
            <KeyValueList items={estimateList} />
            {{
                "pending": <div>
                    <p>{t("continueRepairMessage")}</p>
                    <div className="flex flex-row gap-2">
                        <Button className="flex-1" onClick={()=>{setInternalState("approved")}}>{t("approve")}</Button>
                        <Button className="flex-1" onClick={()=>{setInternalState("cancelled")}} variant="secondary">{t("cancel")}</Button>
                    </div>
                </div>,
                "approved": <HighlightedText color={HighlightColors.Green} className="text-center">{t("approvedMessage")}</HighlightedText>,
                "cancelled": <HighlightedText color={HighlightColors.Red} className="text-center">{t("canceledMessage")}</HighlightedText>
            }[internalState]}
        </div>
    )
}