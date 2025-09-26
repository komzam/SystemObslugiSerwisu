import * as React from 'react';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type Dropdown2Props = DropdownMenu.DropdownMenuProps &{
    classNameTrigger?: string;
    classNamePortal?: string;
    triggerText?: string;
    triggerIcon?: React.ReactNode;
    items: Dropdown2Items;
}

export type Dropdown2Items = Value[];

type Value = {
    valueLabel: string;
    isDisabled?: boolean;
    onClick?: () => void;
}


export function Dropdown2( {classNameTrigger="", classNamePortal="", triggerText="", triggerIcon, items, ...props} : Dropdown2Props ) : React.ReactNode {


    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className={`${classNameTrigger} focus:outline-0 select-none`} asChild>
                <button>
                    {triggerText}{triggerIcon}
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className={` bg-white drop-shadow-xl rounded-md p-4 w-max ${classNamePortal}`} sideOffset={5}>
                    {items.map((value:Value, valueNumber:number) => (
                        <DropdownMenu.Item key={valueNumber}
                                           onClick={value.onClick}
                                           className={`rounded-md p-2 cursor-default select-none 
                                           ${value.isDisabled != undefined && value.isDisabled? "text-accent4" :"hover:bg-primary hover:text-white hover:outline-0"}`}
                                           disabled={value.isDisabled != undefined && value.isDisabled}>
                            {value.valueLabel}
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
