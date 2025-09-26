"use client";
import {ButtonHTMLAttributes, ReactElement} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
    inverse?: boolean;
    active?: boolean;
    icon?: ReactElement;
};

export function Button({ className="", variant="primary", inverse=false, active=true, icon, ...props } : ButtonProps) {

    const variantMap = {
        primary: {
            normal: "bg-primary text-white disabled:bg-secondary",
            inverse: "bg-white text-primary disabled:text-secondary"
        },
        secondary: {
            normal: "bg-white text-primary border-1 border-solid border-primary disabled:text-secondary disabled:border-secondary",
            inverse: "bg-primary text-white border-1 border-solid border-white disabled:bg-secondary"
        }
    };

    const commonClasses: string = "rounded-md py-[10px] px-[15px] drop-shadow-sm cursor-pointer disabled:cursor-default select-none";
    const variableClasses: string = variantMap[variant][inverse ? "inverse" : "normal"];

    if(icon !== undefined){
        return (<button className={`${commonClasses} ${variableClasses} ${className} flex flex-row items-center justify-center gap-1`} {...props}>{icon} {props?.children}</button>);
    }else{
        return (<button className={`${commonClasses} ${variableClasses} ${className}`} {...props} />);
    }
}