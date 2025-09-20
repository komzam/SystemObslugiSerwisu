export type KeyValueLineProps = {
    label: string;
    value: string;
}

export function KeyValueLine({label, value} : KeyValueLineProps) {
    return(
        <div className="flex flex-row w-full justify-between">
            <span className="text-left">{label}</span>
            <span className="text-right">{value}</span>
        </div>
    )
}