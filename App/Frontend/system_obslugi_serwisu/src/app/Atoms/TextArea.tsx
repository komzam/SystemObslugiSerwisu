import * as React from "react";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    placeholder?: string;
    className?: string;
    rows?: number;
};

export function TextArea({placeholder, className, rows=4, ...props}: TextAreaProps) {

    const states = {
        normal: "bg-inherit border-2 border-secondary rounded-md text-regular p-2 placeholder-accent4 resize-none drop-shadow-sm",
        focused: "focus:border-primary focus:outline-0",
        disabled: "disabled:border-accent3"
    };


    return (
        <textarea className={`${states["normal"]} ${states["focused"]} ${states["disabled"]} ${className}`}
               placeholder= {placeholder != undefined ? placeholder : "Text"}
                  rows={rows}
               {...props} />
    );
}