import {LuChevronLeft} from "react-icons/lu";
import {ButtonHTMLAttributes} from "react";

export type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement>&{
    children?: string;
    className?: string;
}

export function BackButton({children, className="", ...props}: BackButtonProps) {
    return (
        <button className={`flex flex-row w-fit text-primary font-bold cursor-pointer ${className}`} {...props}>
            <LuChevronLeft size={24}/>
            {children}
        </button>
    )
}