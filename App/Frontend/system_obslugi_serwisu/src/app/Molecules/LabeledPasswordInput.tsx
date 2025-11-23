"use client"

import * as React from "react";
import {PasswordToggleFieldInputProps} from "@radix-ui/react-password-toggle-field";
import {PasswordInput} from "@/app/Molecules/PasswordInput";
import {ChangeEvent} from "react";

type PasswordInputProps = Omit<PasswordToggleFieldInputProps, "placeholder"> & {
    label: string;
    id: string;
    className?: string;
    wrapperClassName?: string;
    description?: string;
};

//calc(100%-1rem) used for truncation. The 1 rem is removed to remove the 0.5rem shift from left-2 and add equal 0.5rem margin to right side.

export function LabeledPasswordInput({label, id, className="", wrapperClassName="", description, onChange, value="", ...props}: PasswordInputProps) {
    const onChangeAction = (e: ChangeEvent<HTMLInputElement>) => {
        if(onChange) onChange(e);
    }

    const placeholderShown = value === "";

    return (
        <div className={`bg-inherit relative mt-3 w-fit rounded-md group ${wrapperClassName}`}>
            <PasswordInput placeholder=" " id={id} className={`${className}`} onChange={onChangeAction} value={value} {...props}></PasswordInput>
            <label htmlFor={id}
                   className={`absolute bg-inherit px-0.5 left-2 -top-3 max-w-[calc(100%-1rem)] select-none cursor-text truncate
                              ${placeholderShown ? "top-2.5 text-regular p-0 text-accent4" : "text-smaller1"}
                              group-focus-within:-top-3 group-focus-within:text-smaller1 group-focus-within:px-0.5 group-focus-within:text-black
                              transition-all duration-100 ease-in-out`}
            >
                {label}
            </label>
            {description!=undefined && <span className="block px-2 text-smaller1 text-accent4 truncate w-0 min-w-full">
                {description}
            </span>}
        </div>
    );
}