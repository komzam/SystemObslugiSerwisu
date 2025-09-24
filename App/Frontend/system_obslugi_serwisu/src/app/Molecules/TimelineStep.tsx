import * as React from "react";

export type TimelineStepProps = {
    children?: React.ReactNode;
    isFirst?: boolean;
}

export function TimelineStep({children, isFirst=false}: TimelineStepProps) {
    return (
        <div className="flex flex-row gap-2 w-full">
            <div className="flex flex-col items-center w-fit">
                <div className="flex w-5 h-5 bg-secondary rounded-full flex-shrink-0 items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"/>
                </div>
                {!isFirst && <div className="w-1 flex-1 mt-2 bg-accent4"/>}
            </div>

            {children}
        </div>
    )
}