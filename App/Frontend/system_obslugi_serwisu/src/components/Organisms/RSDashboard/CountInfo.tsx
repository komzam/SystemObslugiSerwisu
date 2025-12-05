import CountCard from "@/components/Organisms/RSDashboard/CountCard";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

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
            <Link href="/repairs?status=AWAITING_DIAGNOSIS" className={"flex-1"}><CountCard className={"w-full h-full"}
                                                                                            count={awaitingDiagnosis}
                                                                                            countColor="blue"
                                                                                            title={t("AWAITING_DIAGNOSIS")}/></Link>
            <Link href="/repairs?status=AWAITING_REPAIR" className={"flex-1"}><CountCard className={"w-full h-full"}
                                                                                         count={awaitingRepair}
                                                                                         countColor="yellow"
                                                                                         title={t("AWAITING_REPAIR")}/></Link>
            <Link href="/repairs?status=AWAITING_SHIPPING" className={"flex-1"}><CountCard className={"w-full h-full"}
                                                                                           count={awaitingShipping}
                                                                                           countColor="lime"
                                                                                           title={t("AWAITING_SHIPPING")}/></Link>
            <Link href="/repairs?status=READY_FOR_PICKUP" className={"flex-1"}><CountCard className={"w-full h-full"}
                                                                                          count={readyForPickup}
                                                                                          countColor="green"
                                                                                          title={t("READY_FOR_PICKUP")}/></Link>
            <Link href="/repairs?status=COMPLAINT" className={"flex-1"}><CountCard className={"w-full h-full"}
                                                                                   count={complaint} countColor="red"
                                                                                   title={t("COMPLAINT")}/></Link>
        </div>
    );
}