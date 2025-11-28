import * as React from "react";
import {Dropdown, DropdownProps} from "./Dropdown";

export type DropdownWithLabelProps = DropdownProps & {
    label: string;
};

export function LabeledDropdown({placeholder, items, label, classNameTrigger="", classNamePortal="", ...props} : DropdownWithLabelProps ) : React.ReactNode {
    return (
        <div className="bg-inherit rounded-md w-fit">
            <label className="relative block bg-inherit ml-2 mr-6 -mb-2 px-0.5 text-smaller2 select-none z-2 w-fit">{label}</label>
            <Dropdown classNameTrigger={`z-1 w-full ${classNameTrigger}`} classNamePortal={`z-2 ${classNamePortal}`} placeholder={placeholder} items={items} {...props}></Dropdown>
        </div>
    );
}