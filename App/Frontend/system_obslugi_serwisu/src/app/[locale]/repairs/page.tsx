import * as React from "react";
import {RepairItemProps} from "@/app/Molecules/RepairItem";
import {RepairsList} from "@/app/Organisms/RepairsList";
import {StatusType} from "@/app/Atoms/Status";

export default function Repairs() {
    const repairs: RepairItemProps[] = [
        { title: "Playstation 5", repairTicketNumber: 123456789, description: "The fan is super loud", status: StatusType.Booked },
    ]

    return (
        <div className="bg-inherit flex justify-center">
            <div className="flex flex-col gap-5 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                <p className="text-larger1 font-bold">My Repairs</p>
                <RepairsList repairs={repairs}/>
            </div>
        </div>
    );
}
