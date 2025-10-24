import * as React from 'react';
import * as Select from "@radix-ui/react-select";
import { LuChevronDown, LuChevronUp, LuCheck } from "react-icons/lu";
import {memo} from "react";

export type DropdownProps = Select.SelectProps &{
    classNameTrigger?: string;
    classNamePortal?: string;
    placeholder: string;
    items: DropdownItems;
}

export type DropdownItems = Group[];

type Group = {
    groupName?: string,
    values: Value[];
}

type Value = {
    valueName: string;
    valueLabel: string;
    isDisabled?: boolean;
}


export function Dropdown( { placeholder, items, classNameTrigger="", classNamePortal="", ...props } : DropdownProps ) : React.ReactNode {

    return (
    <Select.Root {...props}>
        <Select.Trigger className={`bg-inherit p-2 border-2 rounded-md drop-shadow-sm border-secondary flex flex-row justify-between items-center focus:outline-0 ${classNameTrigger}`}>
            <Select.Value placeholder={placeholder}/>
            <Select.Icon className="text-accent4">
                <LuChevronDown />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className={`bg-white py-2 px-3 rounded-md drop-shadow-sm ${classNamePortal}`} position={"popper"}>
                <Select.ScrollUpButton className="flex justify-center items-center">
                    <LuChevronUp />
                </Select.ScrollUpButton>
                <Select.Viewport>
                    <DropdownList items={items}/>
                </Select.Viewport>
                <Select.ScrollDownButton className="flex justify-center items-center">
                    <LuChevronDown />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
    );
}

const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <Select.Item
                {...props}
                className={`flex flex-row items-center gap-1 rounded-md px-2 py-1 hover:outline-0 select-none focus:outline-0
                            ${props?.disabled ? "cursor-default text-accent4" : "cursor-pointer hover:bg-primary hover:text-white"}`}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                    <LuCheck/>
                </Select.ItemIndicator>
            </Select.Item>
        );
    },
);
SelectItem.displayName = 'SelectItem';

const DropdownList = memo(function DropdownList({ items }: {items: DropdownItems;}) {
    return(
        <>
            {
                items.map((group:Group, groupNumber:number) => (
                    <Select.Group key={groupNumber}>
                        {
                            group.groupName != undefined &&
                            group.groupName != "" &&
                            <Select.Label className="text-smaller1 text-accent4 select-none">{group.groupName}</Select.Label>
                        }
                        {
                            group.values.map((value:Value, valueNumber:number)=>(
                                <SelectItem value={value.valueName} key={valueNumber} disabled={value.isDisabled != undefined && value.isDisabled}>{value.valueLabel}</SelectItem>
                            ))
                        }
                    </Select.Group>
                ))
            }
        </>
    )
});