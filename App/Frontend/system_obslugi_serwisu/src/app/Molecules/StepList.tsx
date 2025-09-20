import {Step, StepProps} from "@/app/Molecules/Step";

export type StepListProps = {
    steps: StepInfo[];
};

export type StepInfo = {
    stepText: string;
    stepDescription?: string;
}

export function StepList({steps}: StepListProps) {

    return(
        <div className="w-full flex flex-col gap-2">
            {steps.map((step, index) => (
                <Step key={index} stepNumber={index+1} stepText={step.stepText} stepDescription={step.stepDescription} />
            ))}
        </div>
    )
}