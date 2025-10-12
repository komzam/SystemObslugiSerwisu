"use client"

import { ButtonHTMLAttributes, ReactNode, useState } from "react";

export type HorizontalSelectButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
    selected: boolean;
}

export type HorizontalSelectOption = {
    value: string;
    label: string;
}

export type HorizontalSelectProps = {
    options: HorizontalSelectOption[];
    onChangeAction: (selected: number) => void;
    className?: string;
}

export function HorizontalSelect({ options, onChangeAction, className="" }:HorizontalSelectProps) {
    const [selected, setSelected] = useState<number>(0);

    const onButtonClick = (optionIndex : number) => {
        if(optionIndex != selected) {
            setSelected(optionIndex);
            onChangeAction(optionIndex);
        }
    }

    return (
        <div className={`w-full flex flex-row gap-5 ${className}`}>
            {
                options.map((option: HorizontalSelectOption, optionIndex: number) => (
                    <HorizontalSelect.Button key={optionIndex} selected={selected==optionIndex} onClick={() => onButtonClick(optionIndex)}>{option.label}</HorizontalSelect.Button>
                ))
            }
        </div>
    )
}

HorizontalSelect.Button = function HorizontalSelectButton( { children, selected, ...props}: HorizontalSelectButtonProps ) {
    return <button className={`flex-1 w-full font-bold text-center border-2 p-5 rounded-xl cursor-pointer select-none
                            ${selected ? "text-primary border-primary" : "text-accent4 border-secondary"}`} {...props}>{children}</button>
}