import {Card} from "@/app/Atoms/Card";

export type RepairItemProps = {
    title: string;
    repairTicketNumber: number;
    description: string;
}

export function RepairItem({title, repairTicketNumber, description}: RepairItemProps) {
    return (
        <Card className="w-full">
            <div className="flex flex-col gap-2 w-full">
                <div className="w-full">
                    <p className="text-larger2 font-bold">{title}</p>
                    <p className="text-smaller1 text-accent3">{repairTicketNumber.toString()}</p>
                </div>
                <p className="text-accent4 line-clamp-1">{description}</p>
            </div>
        </Card>
    )
}