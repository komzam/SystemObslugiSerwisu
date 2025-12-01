import {RepairStatus} from "@/__generated__/types";
import {RsListCell, RSListRow} from "@/components/Molecules/RSList/RSListRow";
import {RSListHeader, RsListHeaderCell} from "@/components/Molecules/RSList/RSListHeader";
import {Card} from "@/components/Atoms/Card";
import {RSList} from "@/components/Molecules/RSList/RSList";

export type RepairListRepair = {
    id: string,
    ticketNumber: string,
    customer: {
        name: string,
    }
    deviceInfo: {
        model: string,
        manufacturer: string,
    },
    status: RepairStatus,
    technician?: string,
    modifiedAt: Date
}

export type RSRepairListProps = {
    repairs: RepairListRepair[]
}

export function RSRepairList({repairs}: RSRepairListProps) {
    const headerCells:RsListHeaderCell[] = [
        {title:"Repair Ticket Number"},
        {title:"Customer"},
        {title:"Device"},
        {title:"Status"},
        {title:"Technician"},
        {title:"Modified At"},
        {title:"Actions"},
    ]

    return(
        <div className="flex flex-col w-full">
            <Card>
                <RSList columns={[{width:"1fr"},{width:"1fr"},{width:"1fr"},{width:"1fr"},{width:"1fr"},{width:"1fr"},{width:"auto"}]}>
                    <RSListHeader cells={headerCells}/>
                    {repairs.map((repair, repairIndex) => {
                        const cells: RsListCell[] = [
                            {kind: "textBold", content: repair.ticketNumber},
                            {kind: "text", content: repair.customer.name},
                            {kind: "text", content: repair.deviceInfo.manufacturer + " " + repair.deviceInfo.model},
                            {kind: "repairStatus", content: repair.status},
                            {kind: "text", content: repair.technician??"Unassigned"},
                            {kind: "text", content: repair.modifiedAt.toLocaleDateString()},
                            {kind: "link", content: "View Details", href:`/repair/${repair.id}`},
                        ];

                        return <RSListRow key={repairIndex} cells={cells} separator={repairIndex < repairs.length - 1}/>;
                    })}
                </RSList>
            </Card>
        </div>
    )
}