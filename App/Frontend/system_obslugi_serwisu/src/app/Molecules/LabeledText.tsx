type LabeledTextProps = {
    label: string;
    children?: string;
    className?: string;
}

export function LabeledText({label, children, className=""}: LabeledTextProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <p className="font-bold">{label}</p>
            <p className={className}>{children}</p>
        </div>
    )
}