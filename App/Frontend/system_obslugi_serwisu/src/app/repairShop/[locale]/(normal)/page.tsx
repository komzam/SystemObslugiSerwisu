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
            <div className="flex flex-row gap-7">
                <RSDashboard.ActiveRepair className="flex-3" activeRepair={
                    {
                        id:"23f8237c-2d12-4fac-8fb7-eac6c1b2e02c",
                        title:"Playstation 5",
                        description:"Konsola ma problem z włączeniem się",
                        status: RepairStatus.Created,
                        assignedOn:new Date(),
                        ticketNumber:"REP-BVGD-77LK"
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