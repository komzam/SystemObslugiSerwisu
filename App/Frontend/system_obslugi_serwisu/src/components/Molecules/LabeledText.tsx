import {ReactNode} from "react";

type LabeledTextProps = {
    label: string;
    labelIcon?: ReactNode;
    children?: string;
    className?: string;
    wrapperClassName?: string;
}

export function LabeledText({label, labelIcon, children, className="", wrapperClassName=""}: LabeledTextProps) {
    return (
        <div className={`flex flex-col gap-1 w-full ${wrapperClassName}`}>
            <p className="font-bold flex flex-row gap-2 items-center">{labelIcon}{label}</p>
            <p className={className}>{children}</p>
        </div>
    )
}