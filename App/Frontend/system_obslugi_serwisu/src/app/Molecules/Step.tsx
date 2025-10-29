import {Dot} from "@/app/Atoms/Dot"

export type StepProps = {
    stepNumber: number;
    stepText: string;
    stepDescription?: string;
}


export function Step({stepNumber, stepText, stepDescription}: StepProps) {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-x-2 items-center w-full">
            <Dot text={stepNumber.toString()} />
            <p className="overflow-hidden text-ellipsis">{stepText}</p>
            {stepDescription!=undefined &&
                <p className="col-start-2 -mt-1.5 sm:-mt-2 text-smaller1 overflow-hidden text-ellipsis text-accent4">
                    {stepDescription}
                </p>}
        </div>
    )
}