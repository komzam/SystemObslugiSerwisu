import {RepairHistory} from "@/app/Molecules/RepairHistory";
import {RepairHistoryStepProps} from "@/app/Molecules/RepairHistoryStep";
import {useTranslations} from "next-intl";
import {GetRepairQuery} from "@/__generated__/types";
import {DateTime} from "luxon";


export type RepairDetailsHistoryProps = {
    repairHistory: GetRepairQuery["repair"]["repairHistory"];
}

export function RepairDetailsHistory({repairHistory} : RepairDetailsHistoryProps){
    const t = useTranslations("RepairDetails")

    const steps : RepairHistoryStepProps[] = []

    for(var repairStep of repairHistory){
        const date = DateTime.fromISO(repairStep.createdAt).toFormat("dd.MM.yyyy HH:mm");
        switch(repairStep.__typename){
            case "NormalRepairStepDto":
                steps.push({stepName:"Repair step name here", date:date, description:repairStep.description??"Example step description"});
                break;
            case "PaymentRepairStepDto":
                steps.push({stepName:"Repair step name here", date:date, description:repairStep.description??"Example step description", payment: {finalAmount:repairStep.amount}});
                break;
            case "QuoteRepairStepDto":
                steps.push({stepName:"Repair step name here", date:date, description:repairStep.description??"Example step description", costEstimate: {
                    partsCost:repairStep.partsCost,
                    laborCost:repairStep.laborCost,
                    totalCost:repairStep.totalCost,
                    state: repairStep.quoteAccepted == null ? "pending" : repairStep.quoteAccepted ? "approved" : "cancelled"
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