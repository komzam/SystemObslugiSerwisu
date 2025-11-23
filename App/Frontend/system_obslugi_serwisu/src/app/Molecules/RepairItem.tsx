import {Card} from "@/app/Atoms/Card";
import {Link} from "@/i18n/navigation";
import {Status} from "@/app/Atoms/Status";
import * as React from "react";
import {GetCustomerRepairsQuery} from "@/__generated__/types";

type Customer = Extract<GetCustomerRepairsQuery["me"], { __typename: "FullCustomerDto" }>;
type Repair = Customer["repairs"]["items"][number];

export type RepairItemProps = {
    repair: Repair;
}

export function RepairItem({repair}: RepairItemProps) {
    return (
        <Link href={`/repair/${repair.id}`}>
            <Card className="w-full">
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:items-center">
                    <div className="flex-1 flex flex-col gap-2 w-full">
                        <div className="w-full">
                            <p className="text-larger2 font-bold">{repair.deviceInfo.manufacturer} {repair.deviceInfo.model}</p>
                            <p className="text-smaller1 text-accent3">{repair.id}</p>
                        </div>
                        <p className="text-accent4 line-clamp-1">{repair.faultInfo.description}</p>
                    </div>
                    <div className="flex flex-row justify-end">
                        <Status type={repair.status} />
                    </div>
                </div>
            </Card>
        </Link>
    )
}