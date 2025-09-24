import {TimelineStep, TimelineStepProps} from "@/app/Molecules/TimelineStep";

export type RepairHistoryStepProps = TimelineStepProps & {
    stepName: string;
    date: string;
    description: string;
}

export function RepairHistoryStep({stepName, date, description, isFirst}: RepairHistoryStepProps) {
    return (
        <TimelineStep isFirst={isFirst}>
            <div className="flex flex-col gap-1 w-full">
                <p className="font-bold">{stepName}</p>
                <p className="text-smaller2 text-accent4">{date}</p>
                <p className="text-smaller1 text-accent4">{description}</p>
            </div>
        </TimelineStep>
    )
}