import {HighlightColors, HighlightedText} from "@/app/Atoms/HighlightedText";


export type KeyValueLineProps = {
    label: string;
    value: string;
    valueBold?: boolean;
    valueHightlighted?: boolean;
    valueHighlightColor?: HighlightColors.Gray;
    wrapperClassName?: string;
}

export function KeyValueLine({label, value, valueBold=false, valueHightlighted=false, valueHighlightColor, wrapperClassName=""} : KeyValueLineProps) {
    return(
        <div className={`flex flex-row w-full justify-between items-center ${wrapperClassName}`}>
            <span className="text-left">{label}</span>
            {valueHightlighted?
                <HighlightedText className={`text-right ${valueBold && "font-bold"} whitespace-nowrap truncate`} color={valueHighlightColor}>{value}</HighlightedText>
                :
                <span className={`text-right ${valueBold && "font-bold"} whitespace-nowrap truncate`}>{value}</span>}
        </div>
    )
}