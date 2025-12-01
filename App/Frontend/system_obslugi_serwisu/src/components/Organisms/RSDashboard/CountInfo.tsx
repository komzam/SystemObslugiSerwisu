import CountCard from "@/components/Organisms/RSDashboard/CountCard";
import {useTranslations} from "next-intl";

export type CountInfoProps = {
    awaitingDiagnosis: number;
    awaitingRepair: number;
    awaitingShipping: number;
    readyForPickup: number;
    complaint: number;
}

export default function CountInfo({awaitingDiagnosis, awaitingRepair, awaitingShipping, readyForPickup, complaint}: CountInfoProps) {
    const t = useTranslations("Status");
    return(
        <div className="flex flex-row gap-7">
            <CountCard className={"flex-1"} count={awaitingDiagnosis} countColor="blue" title={t("AWAITING_DIAGNOSIS")}/>
            <CountCard className={"flex-1"} count={awaitingRepair} countColor="yellow" title={t("AWAITING_REPAIR")}/>
            <CountCard className={"flex-1"} count={awaitingShipping} countColor="lime" title={t("AWAITING_SHIPPING")}/>
            <CountCard className={"flex-1"} count={readyForPickup} countColor="green" title={t("READY_FOR_PICKUP")}/>
            <CountCard className={"flex-1"} count={complaint} countColor="red" title={t("COMPLAINT")}/>
        </div>
    );
}