import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    placeholder?: string;
    className?: string;
};

export function TextInput({placeholder, className="", ...props}: InputProps) {

    const states = {
        normal: "bg-inherit border-2 border-secondary rounded-md text-regular p-2 placeholder-accent4 -min-w-fit drop-shadow-sm",
        focused: "focus:border-primary focus:outline-0",
        disabled: "disabled:border-accent3"
    };


    return (
        <input className={`${states["normal"]} ${states["focused"]} ${states["disabled"]} ${className}`}
               placeholder= {placeholder != undefined ? placeholder : "Text"}
               {...props} />
    );
}