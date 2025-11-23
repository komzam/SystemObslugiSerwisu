import {Switch, SwitchProps} from "@/app/Atoms/Switch"

export type LabeledSwitchProps = SwitchProps & {
    label: string
    labelPos?: "left" | "right"
}

export function LabeledSwitch({label, id, labelPos="left", ...props}: LabeledSwitchProps) {
    return(
        <div className="flex items-center gap-3">
            {labelPos == "left" && <label>{label}</label>}
            <Switch id={id} {...props}/>
            {labelPos == "right" && <label>{label}</label>}
        </div>
    )
}