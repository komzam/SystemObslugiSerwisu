"use client"

import { Link } from "@/i18n/navigation";
import * as React from "react";

export type RSNavbarButtonProps = {
    href: string;
    className?: string;
    isHighlighted?: boolean;
    icon: React.ReactNode;
    children?: React.ReactNode;
};

export function RSNavbarButton({className="", isHighlighted=false, href, icon, children}: RSNavbarButtonProps) {
    const variableClasses = {
        normal: "text-accent4 hover:bg-accent2 select-none px-2 py-2",
        highlighted: "text-white bg-primary select-none px-2 py-2"
    }

    return (
        <Link className={`cursor-pointer flex flex-row gap-2 items-center rounded-lg ${variableClasses[isHighlighted? "highlighted" : "normal"]} ${className}`} href={href}>
            {icon}
            {children}
        </Link>
    );
}