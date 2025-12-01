"use client"

import {RepairDetailsTitle} from "@/components/Organisms/RepairDetailsTitle";
import {RepairDetailsDevInfo} from "@/components/Organisms/RepairDetailsDevInfo";
import {RepairDetailsFaultInfo} from "@/components/Organisms/RepairDetailsFaultInfo";
import {RepairDetailsImages} from "@/components/Organisms/RepairDetailsImages";
import {RepairDetailsHistory} from "@/components/Organisms/RepairDetailsHistory";
import {GetRepairQuery, GetRepairQueryVariables} from "@/__generated__/types";
import {ProtectedRoute} from "@/components/Utils/ProtectedRoute";
import {useQuery} from "@apollo/client/react";
import {GET_REPAIR} from "@/graphql/GetRepair";
import {useParams} from "next/navigation";
import {Link, useRouter} from "@/i18n/navigation";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {BackButton} from "@/components/Atoms/BackButton";
import {useTranslations} from "next-intl";

export default function Repair() {
    const params = useParams();
    const t = useTranslations("RepairDetails");
    const router = useRouter();
    const repairId = params.id;

    if(!repairId) router.back();

    const {data, error, loading} = useQuery<GetRepairQuery, GetRepairQueryVariables>(GET_REPAIR, {variables:{
        repairId:repairId as string
    }});

    if(error) return <p>ERROR</p>;
    if(loading) return <LoadingIcon/>;
    if(!data) return <p>ERROR</p>;

    const repair = data.repair;

    return (
        <ProtectedRoute>
            <div className="flex bg-inherit justify-center py-5">
                <div className="flex flex-col gap-5 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                    <Link href="/repairs"><BackButton>{t("rsBackButton")}</BackButton></Link>
                    <RepairDetailsTitle title={`${repair.deviceInfo.manufacturer} ${repair.deviceInfo.model}`}
                                        repairTicketNumber={repair.ticketNumber}
                                        status={repair.status}
                                        conversationId={repair.conversationId}/>
                    <RepairDetailsDevInfo deviceType={repair.deviceInfo.deviceType}
                                          manufacturer={repair.deviceInfo.manufacturer}
                                          modelName={repair.deviceInfo.model}
                                          serialNumber={repair.deviceInfo.serialNumber}/>
                    <RepairDetailsFaultInfo
                        whenFaultOccurred={repair.faultInfo.whenOccurred}
                        howToReplicateFault={repair.faultInfo.howToReproduce}
                        faultDescription={repair.faultInfo.description}/>
                    {repair.images.length >0 && <RepairDetailsImages images={repair.images}/>}
                    <RepairDetailsHistory repairId={repair.id} repairHistory={repair.repairHistory}/>
                </div>
            </div>
        </ProtectedRoute>
    )
}