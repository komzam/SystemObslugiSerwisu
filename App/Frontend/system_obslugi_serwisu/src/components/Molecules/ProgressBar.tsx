import {ProgressBarStep} from "@/components/Molecules/ProgressBarStep";

export type ProgressBarProps = {
    stepNames: string[];
    currentStep: number;
}

export function ProgressBar({stepNames, currentStep}: ProgressBarProps) {
    const selectedStep = Math.min(Math.max(currentStep, 0), stepNames.length-1);

    return (
        <div className="flex flex-row w-full">
            {stepNames.map((stepName: string, stepNumber: number) => (
                <ProgressBarStep key={stepNumber}
                                 name={stepName}
                                 type={stepNumber==0? "first" : stepNumber==stepNames.length-1? "last" : "normal"}
                                 isActive={stepNumber <= selectedStep}
                                 isNextActive={stepNumber < selectedStep}
                                 className="flex-1"
                />
            ))}
        </div>
    )
}