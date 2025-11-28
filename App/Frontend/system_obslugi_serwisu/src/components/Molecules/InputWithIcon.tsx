import {ReactNode, InputHTMLAttributes} from "react";

export type InputWithIconProps = InputHTMLAttributes<HTMLInputElement> & {
    placeholder?: string;
    className?: string;
    wrapperClassName?: string;
    icon?: ReactNode;
};

export function InputWithIcon({placeholder, icon, wrapperClassName="", className="", ...props}: InputWithIconProps) {

    const states = {
        normal: "border-2 border-secondary rounded-md text-regular p-2 min-w-fit drop-shadow-sm items-center",
        focused: "focus-within:border-primary focus-within:outline-0",
        disabled: "disabled:border-accent3"
    };


    return (
        <div className={`flex flex-row gap-1 ${states["normal"]} ${states["focused"]} ${states["disabled"]} ${wrapperClassName}`}>
            {icon}
            <input className={`pl-1 focus:outline-0 placeholder-accent4 ${className}`}
                   placeholder= {placeholder != undefined ? placeholder : "Text"}
                   {...props} />
        </div>
    );
}