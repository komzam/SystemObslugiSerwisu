import {KeyValueLine, KeyValueLineProps} from "@/app/Molecules/KeyValueLine";
import * as React from "react";

export type KeyValueListProps = {
    items: KeyValueLineProps[];
    useSeparator?: boolean;
}

export function KeyValueList({items, useSeparator=true}: KeyValueListProps) {
    return (
        <div className="flex flex-col w-full gap-2">
            {items.map((line:KeyValueLineProps, lineNumber:number) => (
                <React.Fragment key={lineNumber}>
                    <KeyValueLine {...line} />
                    {useSeparator && lineNumber < items.length-1 && <hr className="text-accent4 mt-1 mb-1" />}
                </React.Fragment>
            ))}
        </div>
    )
}