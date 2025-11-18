"use client"

import {RepairDetailsTitle} from "@/app/Organisms/RepairDetailsTitle";
import {RepairDetailsDevInfo} from "@/app/Organisms/RepairDetailsDevInfo";
import {RepairDetailsFaultInfo} from "@/app/Organisms/RepairDetailsFaultInfo";
import {RepairDetailsImages} from "@/app/Organisms/RepairDetailsImages";
import {RepairDetailsHistory} from "@/app/Organisms/RepairDetailsHistory";
import {GetRepairQuery, GetRepairQueryVariables} from "@/__generated__/types";
import {ProtectedRoute} from "@/app/Utils/ProtectedRoute";
import {useQuery} from "@apollo/client/react";
import {GET_REPAIR} from "@/graphql/GetRepair";
import {useParams} from "next/navigation";
import {useRouter} from "@/i18n/navigation";
import {LoadingIcon} from "@/app/Molecules/LoadingIcon";

export default function Repair() {
    const params = useParams();
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
                    <RepairDetailsTitle title={`${repair.deviceInfo.manufacturer} ${repair.deviceInfo.model}`}
                                        repairTicketNumber={repair.id}
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
                    <RepairDetailsImages/>
                    <RepairDetailsHistory repairId={repair.id} repairHistory={repair.repairHistory}/>
                </div>
            </div>
        </ProtectedRoute>
    )
}