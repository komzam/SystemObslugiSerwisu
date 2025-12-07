"use client";

import {useTranslations} from "next-intl";
import {KeyValueList} from "@/components/Molecules/KeyValueList";
import {KeyValueLineProps} from "@/components/Molecules/KeyValueLine";
import {HighlightColors, HighlightedText} from "@/components/Atoms/HighlightedText";
import {Button} from "@/components/Atoms/Button";
import {useState} from "react";
import {useMutation} from "@apollo/client/react";
import {APPROVE_QUOTE} from "@/graphql/RepairActions/ApproveQuote";
import {REJECT_QUOTE} from "@/graphql/RepairActions/RejectQuote";
import {
    ApproveQuoteMutation,
    ApproveQuoteMutationVariables,
    RejectQuoteMutation,
    RejectQuoteMutationVariables
} from "@/__generated__/types";
import {ErrorName} from "@/components/Utils/ErrorName";
import {useToast} from "@/components/Utils/ToastNotifications";

export type CostEstimateProps = {
    repairId: string;
    partsCost: string;
    laborCost: string;
    totalCost: string;
    state?: "pending" | "approved" | "cancelled";
    onActionSuccessAction?: () => void;
}

export function CostEstimate({repairId, partsCost, laborCost, totalCost, state="pending", onActionSuccessAction}: CostEstimateProps) {
    const t = useTranslations("RepairDetails");
    const tErr = useTranslations("Errors");
    const toasts = useToast();
    const [approveQuote] = useMutation<ApproveQuoteMutation, ApproveQuoteMutationVariables>(APPROVE_QUOTE);
    const [rejectQuote] = useMutation<RejectQuoteMutation, RejectQuoteMutationVariables>(REJECT_QUOTE, );

    const estimateList: KeyValueLineProps[] = [
        {label: t("parts"), value: partsCost, valueBold:true},
        {label: t("labor"), value: laborCost, valueBold:true},
        {label: t("totalEstimate"), value: totalCost, labelBold:true, valueBold:true}
    ];

    const onApprove = async () => {
        try {
            await approveQuote({variables:{repairId: repairId}});
            onActionSuccessAction?.();
        }catch(err){
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    const onReject = async () => {
        try {
            await rejectQuote({variables:{repairId: repairId}});
            onActionSuccessAction?.();
        }catch(err){
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    return(
        <div className="flex flex-col px-2.5 py-4 gap-2 border-1 border-accent3 rounded-xl w-[clamp(20rem,80vw,40rem)]">
            <p className="font-bold">{t("costEstimate")}</p>
            <KeyValueList items={estimateList} />
            {{
                "pending": <div>
                    <p>{t("continueRepairMessage")}</p>
                    <div className="flex flex-row gap-2">
                        <Button className="flex-1" onClick={onApprove}>{t("approve")}</Button>
                        <Button className="flex-1" onClick={onReject} variant="secondary">{t("cancel")}</Button>
                    </div>
                </div>,
                "approved": <HighlightedText color={HighlightColors.Green} className="text-center">{t("approvedMessage")}</HighlightedText>,
                "cancelled": <HighlightedText color={HighlightColors.Red} className="text-center">{t("canceledMessage")}</HighlightedText>
            }[state]}
        </div>
    )
}