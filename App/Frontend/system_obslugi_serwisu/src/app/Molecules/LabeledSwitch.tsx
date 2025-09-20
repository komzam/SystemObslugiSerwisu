import {Switch, SwitchProps} from "@/app/Atoms/Switch"

export type LabeledSwitchProps = SwitchProps & {
    label: string
}

export function LabeledSwitch({label, id, ...props}: LabeledSwitchProps) {
    return(
        <div className="flex items-center gap-3">
            <label htmlFor={id}>{label}</label>
            <Switch id={id} {...props}/>
        </div>
    )
}