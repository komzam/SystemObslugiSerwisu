import RSDashboard from "@/components/Organisms/RSDashboard";
import {RepairStatus} from "@/__generated__/types";
import {LatestConversationDto} from "@/components/Organisms/RSDashboard/LatestMessages";

export default function rspage(){
    const conversations : LatestConversationDto[] = [
        {id: "", title:"Konsola", lastMessage:"Ssuper super", lastMessageDate: new Date()},
        {id: "", title:"Konsola", lastMessage:"Ssuper super", lastMessageDate: new Date()},
        {id: "", title:"Konsola", lastMessage:"Ssuper11 super", lastMessageDate: new Date()}
    ]

    return(
        <div className="flex flex-col gap-7">
            <RSDashboard.CountInfo
                created={5}
                awaitingDiagnosis={2}
                awaitingRepair={11}
                readyForPickup={4}
                complaints={8}
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
                <RSDashboard.Overview className="flex-1"/>
            </div>
            <RSDashboard.LatestMessages conversations={conversations}/>
        </div>
    )
}