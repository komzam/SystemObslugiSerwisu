import {Card} from "@/app/Atoms/Card";
import {Link} from "@/i18n/navigation";
import {Status, StatusType} from "@/app/Atoms/Status";
import * as React from "react";

export type RepairItemProps = {
    title: string;
    repairTicketNumber: number;
    description: string;
    status: StatusType;
}

export function RepairItem({title, repairTicketNumber, description, status}: RepairItemProps) {
    return (
        <Link href="/repair">
            <Card className="w-full">
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:items-center">
                    <div className="flex-1 flex flex-col gap-2 w-full">
                        <div className="w-full">
                            <p className="text-larger2 font-bold">{title}</p>
                            <p className="text-smaller1 text-accent3">{repairTicketNumber.toString()}</p>
                        </div>
                        <p className="text-accent4 line-clamp-1">{description}</p>
                    </div>
                    <div className="flex flex-row justify-end">
                        <Status type={status} />
                    </div>
                </div>
            </Card>
        </Link>
    )
}