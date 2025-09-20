import * as React from 'react';
import {Card} from "@/app/Atoms/Card";
import {RepairFormNavButtons, RepairFormNavButtonsProps} from "@/app/Molecules/RepairFormNavButtons";

export type RepairFormCardProps = RepairFormNavButtonsProps & {
    title: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export function RepairFormCard({title, icon, children, className="", ...props}:RepairFormCardProps) {
    return (
        <Card className={`flex flex-col justify-center items-center gap-10 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),60rem)] ${className}`}>
            <div className="flex flex-col justify-center items-center gap-2 w-full">
                {icon}
                <span className="text-larger1 font-bold text-center">{title}</span>
            </div>
            {children}
            <RepairFormNavButtons {...props}/>
        </Card>
    )
}