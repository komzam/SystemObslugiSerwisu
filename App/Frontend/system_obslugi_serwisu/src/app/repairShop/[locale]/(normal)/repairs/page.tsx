import {RepairListRepair, RSRepairList} from "@/components/Organisms/RSRepairList";
import {RepairStatus} from "@/__generated__/types";

export default function RepairsPage(){
    const repairs:RepairListRepair[] = [
        {
            id: "21826b32-e785-4077-989c-282c2e2b7230",
            ticketNumber: "REP-AV6D-LK65",
            customer: {
                name: "Jacek Placek"
            },
            deviceInfo:{
                manufacturer: "Sony",
                model: "Playstation 5"
            },
            status: RepairStatus.Created,
            technician: undefined,
            modifiedAt: new Date()
        },
        {
            id: "abcd",
            ticketNumber: "REP-AV6D-LK65",
            customer: {
                name: "Jacek Placek"
            },
            deviceInfo:{
                manufacturer: "Sony",
                model: "Playstation 5"
            },
            status: RepairStatus.Created,
            technician: undefined,
            modifiedAt: new Date()
        },
        {
            id: "abcd",
            ticketNumber: "REP-AV6D-LK65",
            customer: {
                name: "Jacek Placek"
            },
            deviceInfo:{
                manufacturer: "Sony",
                model: "Playstation 5"
            },
            status: RepairStatus.Created,
            technician: undefined,
            modifiedAt: new Date()
        }
    ];

    return <RSRepairList repairs={repairs}/>;
}