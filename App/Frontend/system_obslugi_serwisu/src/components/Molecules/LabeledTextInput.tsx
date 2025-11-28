"use client";

import {TextInput} from "../Atoms/TextInput";
import * as React from "react";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> & {
    label: string;
    id: string;
    className?: string;
    wrapperClassName?: string;
    description?: string;
};

//calc(100%-1rem) used for truncation. The 1 rem is removed to remove the 0.5rem shift from left-2 and add equal 0.5rem margin to right side.

export function LabeledTextInput({label, id, className="", wrapperClassName="", description, ...props}: InputProps) {

    return (
        <div className={`bg-inherit relative mt-3 w-fit rounded-md ${wrapperClassName}`}>
            <TextInput placeholder=" " id={id} className={`peer ${className}`} {...props}></TextInput>
            <label htmlFor={id}
                   className="absolute bg-inherit px-0.5 left-2 -top-3 max-w-[calc(100%-1rem)] text-smaller1 select-none cursor-text truncate
                              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-regular peer-placeholder-shown:p-0 peer-placeholder-shown:text-accent4
                              peer-focus:-top-3 peer-focus:text-smaller1 peer-focus:px-0.5 peer-focus:text-black
                              transition-all duration-100 ease-in-out"
            >
                {label}
            </label>
            {description!=undefined && <span className="block px-2 text-smaller1 text-accent4 truncate w-0 min-w-full">
                {description}
            </span>}
        </div>
    );
}