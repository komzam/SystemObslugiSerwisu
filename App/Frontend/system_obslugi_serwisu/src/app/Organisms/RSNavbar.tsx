import {NavbarButton} from "@/app/Atoms/NavbarButton";
import {NavbarActions} from "@/app/Molecules/NavbarActions";
import * as React from "react";
import {RSNavbarActions} from "@/app/Molecules/RSNavbarActions";

type NavbarProps = {
    className?: string;
    children?: React.ReactNode;
};

export const Root = function NavbarRoot({className="", children}: NavbarProps){
    return <div className={`flex flex-row min-h-screen ${className}`}>{children}</div>
}

export const Navbar = function Navbar({className=""}: NavbarProps) {
    return(
        <nav className={`flex flex-col items-center drop-shadow-xl z-50 w-64 ${className}`}>
            <div className={"bg-primary w-full flex justify-center py-5"}>
                <NavbarButton className="text-larger2" href={"/"}>LOGO</NavbarButton>
            </div>
            <div className={"bg-white w-full flex-1"}>
                <RSNavbarActions/>
            </div>
        </nav>
    )
}

export const Outlet = function NavbarOutlet({className="", children}: NavbarProps){
    return(
        <div className="flex flex-col w-full">
            <div className="fixed top-0 bg-primary w-full flex h-12"/>
            <main className={`${className}`}>
                {children}
            </main>
        </div>
    )
}