import {RepairHistoryStep, RepairHistoryStepProps} from "@/app/Molecules/RepairHistoryStep";

type RepairHistoryProps = {
    steps: RepairHistoryStepProps[];
}

export function RepairHistory({steps}: RepairHistoryProps) {
    return (
        <div className="flex flex-col-reverse gap-2">
            {steps.map((step, stepNumber) => (
                <RepairHistoryStep key={stepNumber} isFirst={stepNumber==0} {...step} />
            ))}
        </div>
    )
}