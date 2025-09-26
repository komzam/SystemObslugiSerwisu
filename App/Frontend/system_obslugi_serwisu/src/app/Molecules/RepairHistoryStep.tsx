import {TimelineStep, TimelineStepProps} from "@/app/Molecules/TimelineStep";
import {CostEstimate, CostEstimateProps} from "@/app/Molecules/CostEstimate";
import {Payment, PaymentProps} from "@/app/Molecules/Payment";

export type RepairHistoryStepProps = TimelineStepProps & {
    stepName: string;
    date: string;
    description: string;
    costEstimate?: CostEstimateProps;
    payment?: PaymentProps;
}

export function RepairHistoryStep({stepName, date, description, isFirst, costEstimate, payment}: RepairHistoryStepProps) {
    return (
        <TimelineStep isFirst={isFirst}>
            <div className="flex flex-col gap-1 w-full">
                <p className="font-bold">{stepName}</p>
                <p className="text-smaller2 text-accent4">{date}</p>
                <p className="text-smaller1 text-accent4">{description}</p>
                {costEstimate!=undefined && <CostEstimate {...costEstimate} />}
                {payment!=undefined && <Payment {...payment} />}
            </div>
        </TimelineStep>
    )
}