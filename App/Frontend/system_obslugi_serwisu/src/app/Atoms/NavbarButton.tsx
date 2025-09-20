import { Link } from "@/i18n/navigation";
import * as React from "react";

export type NavbarButtonProps = {
    href: string;
    className?: string;
    isHighlighted?: boolean;
    children?: React.ReactNode;
};

export function NavbarButton({className, isHighlighted=false, href, children}: NavbarButtonProps) {
    const variableClasses = {
        normal: "text-white hover:text-accent2 select-none",
        highlighted: "text-secondary border-b-1 select-none"
    }

    return (
        <Link className={`cursor-pointer ${variableClasses[isHighlighted? "highlighted" : "normal"]} ${className}`} href={href}>
            {children}
        </Link>
    );
}