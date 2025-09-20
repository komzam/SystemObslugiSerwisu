"use client";

import {TextArea} from "@/app/Atoms/TextArea";
import * as React from "react";

type TextAreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "placeholder"> & {
    label: string;
    id: string;
    className?: string;
    wrapperClassName?: string;
};

//calc(100%-1rem) used for truncation. The 1 rem is removed to remove the 0.5rem shift from left-2 and add equal 0.5rem margin to right side.

export function LabeledTextArea({label, id, className="", wrapperClassName="", ...props}: TextAreaProps) {

    return (
        <div className={`bg-inherit relative mt-3 rounded-md w-fit ${wrapperClassName}`}>
            <TextArea placeholder=" " id={id} className={`peer ${className}`} {...props}></TextArea>
            <label htmlFor={id}
                   className="absolute bg-inherit px-0.5 left-2 -top-3 max-w-[calc(100%-1rem)] text-smaller1 select-none cursor-text truncate
                            peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-regular peer-placeholder-shown:p-0 peer-placeholder-shown:text-accent4
                            peer-focus:-top-3 peer-focus:text-smaller1 peer-focus:px-0.5 peer-focus:text-black
                            transition-all duration-100 ease-in-out"
            >
                {label}
            </label>
        </div>
    );
}