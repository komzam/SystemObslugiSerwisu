import {RepairItem, RepairItemProps} from "@/app/Molecules/RepairItem";

export type RepairListProps ={
    repairs: RepairItemProps[];
}

export function RepairsList({repairs}: RepairListProps){
    return (
        <div className="flex flex-col gap-5 w-full">
            {repairs.map((repair: RepairItemProps, repairNumber:number) => (
                <RepairItem key={repairNumber} {...repair}/>
            ))}
        </div>
    )
}