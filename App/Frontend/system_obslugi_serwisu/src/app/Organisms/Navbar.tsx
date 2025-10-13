import { NavbarButton } from "@/app/Atoms/NavbarButton";
import { NavbarActions } from "@/app/Molecules/NavbarActions"
import * as React from "react";

type NavbarProps = {
    className?: string;
    children?: React.ReactNode;
};

export const Root = function NavbarRoot({className="", children}: NavbarProps){
    return <div className={`flex flex-col min-h-screen ${className}`}>{children}</div>
}

export const Navbar = function Navbar({className=""}: NavbarProps) {
    return(
        <nav className={`fixed top-0 left-0 right-0 bg-primary px-10 py-5 flex items-center justify-between drop-shadow-xl z-50 ${className}`}>
            <div className={"flex items-center"}>
                <NavbarButton href={"/"}>LOGO</NavbarButton>
            </div>
            <NavbarActions/>
        </nav>
    )
}

export const Outlet = function NavbarOutlet({className="", children}: NavbarProps){
    return(
        <main className={`${className}`}>
            {children}
        </main>
    )
}