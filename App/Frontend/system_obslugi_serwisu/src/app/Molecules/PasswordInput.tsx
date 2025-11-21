import * as PasswordToggleField from "@radix-ui/react-password-toggle-field";
import {LuEye, LuEyeClosed} from "react-icons/lu";
import * as React from "react";


type PasswordInputProps = PasswordToggleField.PasswordToggleFieldInputProps & {
    placeholder?: string;
    wrapperClassName?: string;
    className?: string;
};


export function PasswordInput({placeholder, className="", wrapperClassName="", ...props}: PasswordInputProps) {

    const states = {
        normal: "bg-inherit border-2 border-secondary rounded-md text-regular p-2 placeholder-accent4 -min-w-fit drop-shadow-sm",
        focused: "focus-within:border-primary focus-within:outline-0",
        disabled: "disabled:border-accent3"
    };

    return (
        <PasswordToggleField.Root>
            <div className={`flex flex-row items-center gap-1 ${states["normal"]} ${states["focused"]} ${states["disabled"]} ${wrapperClassName}`}>
                <PasswordToggleField.Input className={`flex-1 focus:outline-0 placeholder-accent4 ${className}`}
                                           placeholder= {placeholder != undefined ? placeholder : "Text"}
                                           {...props}
                />
                <PasswordToggleField.Toggle className="Toggle">
                    <PasswordToggleField.Icon
                        visible={<LuEye />}
                        hidden={<LuEyeClosed />}
                    />
                </PasswordToggleField.Toggle>
            </div>
        </PasswordToggleField.Root>
    )
}