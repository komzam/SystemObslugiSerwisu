import * as React from 'react';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {LuCheck, LuChevronDown} from "react-icons/lu";
import {memo, useCallback, useEffect} from "react";

export type Dropdown3Props = DropdownMenu.DropdownMenuProps & {
    classNameTrigger?: string;
    classNamePortal?: string;
    placeholder:string;

    items: Dropdown3Item[];

    initialSelected?: string[];

    onListUpdate: (selectedValues: string[]) => void;
}

export type Dropdown3Item = {
    label: string;
    value: string;
    isDisabled?: boolean
}

export function Dropdown3({classNameTrigger = "", classNamePortal = "", placeholder, items, initialSelected = [], onListUpdate, ...props }: Dropdown3Props): React.ReactNode {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(initialSelected);

    const handleToggle = useCallback((value: string) => {
        setSelectedValues((prev) => (
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        ));
    }, []);

    useEffect(() =>{
        onListUpdate(selectedValues);
    },[selectedValues]);

    return (
        <DropdownMenu.Root {...props}>
            <DropdownMenu.Trigger className={`${classNameTrigger} focus:outline-0 select-none`} asChild>
                <button className={`bg-inherit p-2 border-2 rounded-md drop-shadow-sm border-secondary flex flex-row justify-between items-center focus:outline-0 ${classNameTrigger}`}>
                    <p>{placeholder}</p>
                    {selectedValues.length > 0 && (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full ml-1 mr-1">
                            {selectedValues.length}
                        </span>
                    )}
                    <LuChevronDown className="text-accent4"/>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className={`bg-white py-2 px-3 rounded-md drop-shadow-sm overflow-y-scroll no-scrollbar ${classNamePortal}`}
                    sideOffset={5}
                >
                    <Dropdown3List items={items} handleToggle={handleToggle} selectedValues={selectedValues} />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}


type Dropdown3ListProps = {
    items: Dropdown3Item[];
    selectedValues: string[];
    handleToggle: (value: string) => void;
}
const Dropdown3List = memo(function Dropdown3List({ items, selectedValues, handleToggle }: Dropdown3ListProps){
    return(
        <>
            {items.map((item) => (
                <DropdownMenu.CheckboxItem
                    key={item.value}
                    className={`group relative flex flex-row items-center gap-1 rounded-md pl-8 px-2 py-1 hover:outline-0 select-none focus:outline-0
                                ${item.isDisabled ? "cursor-default text-accent4" : "cursor-pointer hover:bg-primary hover:text-white"}`}
                    checked={selectedValues.includes(item.value)}
                    onCheckedChange={() => handleToggle(item.value)}
                    disabled={item.isDisabled}
                    onSelect={(e) => e.preventDefault()}
                >
                    <DropdownMenu.ItemIndicator className="absolute left-2 flex items-center justify-center">
                        <LuCheck className="w-4 h-4 text-blue-600 group-hover:text-white" />
                    </DropdownMenu.ItemIndicator>

                    {item.label}
                </DropdownMenu.CheckboxItem>
            ))}
        </>
    )
});