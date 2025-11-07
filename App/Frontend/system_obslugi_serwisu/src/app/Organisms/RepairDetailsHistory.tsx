import {RepairHistory} from "@/app/Molecules/RepairHistory";
import {RepairHistoryStepProps} from "@/app/Molecules/RepairHistoryStep";
import {useTranslations} from "next-intl";
import {GetRepairQuery} from "@/__generated__/types";
import {DateTime} from "luxon";


export type RepairDetailsHistoryProps = {
    repairId: string;
    repairHistory: GetRepairQuery["repair"]["repairHistory"];
}

export function RepairDetailsHistory({repairId, repairHistory} : RepairDetailsHistoryProps){
    const t = useTranslations("RepairDetails");
    const tHistory = useTranslations("RepairHistory");

    const steps : RepairHistoryStepProps[] = []

    for(let repairStep of repairHistory){
        const name = tHistory(`${repairStep.status}.title`);
        const description = tHistory(`${repairStep.status}.description`);
        const date = DateTime.fromISO(repairStep.createdAt).toFormat("dd.MM.yyyy HH:mm");
        switch(repairStep.__typename){
            case "NormalRepairStepDto":
                steps.push({stepName:name, date:date, description:repairStep.description??description});
                break;
            case "PaymentRepairStepDto":
                steps.push({stepName:name, date:date, description:repairStep.description??description, payment: {finalAmount:repairStep.amount}});
                break;
            case "QuoteRepairStepDto":
                steps.push({stepName:name, date:date, description:repairStep.description??description, costEstimate: {
                    repairId: repairId,
                    partsCost:repairStep.quote.partsCost,
                    laborCost:repairStep.quote.laborCost,
                    totalCost:repairStep.quote.totalCost,
                    state: repairStep.quote.quoteAccepted == null ? "pending" : repairStep.quote.quoteAccepted ? "approved" : "cancelled"
                    }
                });
                break;
        }
    }



    return(
        <div className="flex flex-col gap-3 ml-[30]">
            <p className="text-larger2 font-bold">{t("repairHistory")}</p>
            <RepairHistory steps={steps}/>
        </div>
    )
}