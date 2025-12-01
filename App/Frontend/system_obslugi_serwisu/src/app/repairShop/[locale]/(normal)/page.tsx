"use client"

import RSDashboard from "@/components/Organisms/RSDashboard";
import {
    ConversationType,
    GetDashboardQuery, GetDashboardQueryVariables,
    RepairStatus
} from "@/__generated__/types";
import {LatestConversationDto} from "@/components/Organisms/RSDashboard/LatestMessages";
import {useQuery} from "@apollo/client/react";
import {GET_DASHBOARD} from "@/graphql/GetDashboard";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";

export default function DashboardPage(){
    const authContext = useAuthContext();
    const { data: queryData, loading: queryLoading } = useQuery<GetDashboardQuery, GetDashboardQueryVariables>(GET_DASHBOARD,
        {
            variables: {
                repairShopId: authContext.authInfo?.__typename == "FullWorkerDto" ? authContext.authInfo.repairShop?.id : null,
            }
        }
    );

    const conversations : LatestConversationDto[] = []
    for(const conversation of queryData?.conversations.conversations.items??[]){
        const title = conversation.conversationType == ConversationType.GeneralChat?
            conversation.customer?.name??""
            :
            (conversation.repair?.deviceInfo.manufacturer??"") +" "+ (conversation.repair?.deviceInfo.model??"")
        ;

        conversations.push({
            id: conversation.id,
            title:title,
            lastMessage:conversation.messages.items[0].content,
            lastMessageDate: new Date(Date.parse(conversation.messages.items[0].createdAt))
        })
    }


    if(queryLoading) return <LoadingIcon/>;
    if(!queryData) return null;

    return(
        <div className="flex flex-col gap-7">
            <RSDashboard.CountInfo
                awaitingDiagnosis={queryData.awaitingDiagnosis}
                awaitingRepair={queryData.awaitingRepair}
                awaitingShipping={queryData.awaitingShipping}
                readyForPickup={queryData.readyForPickup}
                complaint={queryData.complaint}
            />
            <div className="flex flex-row gap-7 min-h-72">
                <RSDashboard.ActiveRepair className="flex-3" activeRepair={
                    queryData.activeRepair.__typename != "FullWorkerDto" || queryData.activeRepair.activeRepair == null? undefined:
                    {
                        id:queryData.activeRepair.activeRepair.id,
                        ticketNumber:queryData.activeRepair.activeRepair.ticketNumber,
                        title:queryData.activeRepair.activeRepair.deviceInfo.manufacturer +" "+ queryData.activeRepair.activeRepair.deviceInfo.model,
                        description:queryData.activeRepair.activeRepair.faultInfo.description,
                        status: queryData.activeRepair.activeRepair.status
                    }
                }/>
                <RSDashboard.Overview className="flex-1"
                                      awaitingDiagnosis={queryData.awaitingDiagnosis}
                                      awaitingRepair={queryData.awaitingRepair}
                                      awaitingShipping={queryData.awaitingShipping}
                                      readyForPickup={queryData.readyForPickup}
                                      complaint={queryData.complaint}
                />
            </div>
            <RSDashboard.LatestMessages conversations={conversations}/>
        </div>
    )
}