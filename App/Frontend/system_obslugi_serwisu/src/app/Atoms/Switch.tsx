import * as RSwitch from "@radix-ui/react-switch"

export type SwitchProps = {
    id: string,
    onChange?: (checked: boolean) => void
}

export function Switch({id, onChange} : SwitchProps) {
    return (
        <RSwitch.Root
            className="w-10 h-6 min-w-10 min-h-6 bg-accent3 rounded-full relative data-[state=checked]:bg-primary outline-none cursor-pointer"
            onCheckedChange={onChange}
            id={id}
        >
            <RSwitch.Thumb
                className="block w-4 h-4 min-w-4 min-h-4 bg-white rounded-full shadow-sm transition-transform translate-x-1 will-change-transform
                        data-[state=checked]:translate-x-5"
            />
        </RSwitch.Root>
    )
}