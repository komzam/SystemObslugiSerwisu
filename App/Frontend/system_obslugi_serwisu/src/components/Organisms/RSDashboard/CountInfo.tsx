import CountCard from "@/components/Organisms/RSDashboard/CountCard";
import {useTranslations} from "next-intl";

export type CountInfoProps = {
    created: number;
    awaitingDiagnosis: number;
    awaitingRepair: number;
    readyForPickup: number;
    complaints: number;
}

export default function CountInfo({created, awaitingDiagnosis, awaitingRepair, readyForPickup, complaints}: CountInfoProps) {
    const t = useTranslations("Status");
    return(
        <div className="flex flex-row gap-7">
            <CountCard className={"flex-1"} count={created} countColor="black" title={t("CREATED")}/>
            <CountCard className={"flex-1"} count={awaitingDiagnosis} countColor="blue" title={t("AWAITING_DIAGNOSIS")}/>
            <CountCard className={"flex-1"} count={awaitingRepair} countColor="yellow" title={t("AWAITING_REPAIR")}/>
            <CountCard className={"flex-1"} count={readyForPickup} countColor="green" title={t("READY_FOR_PICKUP")}/>
            <CountCard className={"flex-1"} count={complaints} countColor="red" title={t("COMPLAINT")}/>
        </div>
    );
}