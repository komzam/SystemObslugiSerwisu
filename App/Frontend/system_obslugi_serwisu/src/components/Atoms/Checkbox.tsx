import * as CheckboxR from "@radix-ui/react-checkbox";

export type CheckboxProps = CheckboxR.CheckboxProps;

export function Checkbox(props:CheckboxProps) {
    return (
        <CheckboxR.Root {...props} className="group flex justify-center items-center h-4 w-4 rounded-sm border-2
                                                border-secondary data-[state=checked]:border-primary disabled:border-accent4 disabled:data-[state=checked]:border-accent4">
            <CheckboxR.Indicator>
                <div className="bg-primary group-disabled:bg-accent4 h-2 w-2 rounded-xs"/>
            </CheckboxR.Indicator>
        </CheckboxR.Root>
    );
}