type LabeledTextProps = {
    label: string;
    children?: string;
    className?: string;
    wrapperClassName?: string;
}

export function LabeledText({label, children, className="", wrapperClassName=""}: LabeledTextProps) {
    return (
        <div className={`flex flex-col gap-1 w-full ${wrapperClassName}`}>
            <p className="font-bold">{label}</p>
            <p className={className}>{children}</p>
        </div>
    )
}