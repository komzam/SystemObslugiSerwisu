import {RepairHistory} from "@/app/Molecules/RepairHistory";
import {RepairHistoryStepProps} from "@/app/Molecules/RepairHistoryStep";
import {useTranslations} from "next-intl";

export function RepairDetailsHistory(){
    const t = useTranslations("RepairDetails")

    const steps : RepairHistoryStepProps[] = [
        {stepName:"Repair step name here", date:"21.05.2023", description:"Example step description"},
        {stepName:"Repair step name here", date:"21.05.2023", description:"Example step description"},
        {stepName:"Repair step name here", date:"21.05.2023", description:"Example step description"},
        {stepName:"Repair step name here", date:"21.05.2023", description:"Example step description"},
        {stepName:"Repair step name here", date:"21.05.2023", description:"Example step description", costEstimate: {partsCost:120, laborCost:110, totalCost:230, state:"pending"}},
        {stepName:"Repair step name here", date:"21.05.2023", description:"Example step description", payment: {finalAmount:230}}
    ]

    return(
        <div className="flex flex-col gap-3 ml-[30]">
            <p className="text-larger2 font-bold">{t("repairHistory")}</p>
            <RepairHistory steps={steps}/>
        </div>
    )
}