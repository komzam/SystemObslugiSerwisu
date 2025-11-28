"use client"

import {NavbarButton} from "@/components/Atoms/NavbarButton";
import * as React from "react";
import {RSNavbarActions} from "@/components/Molecules/RSNavbarActions";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { createContext, useContext, useState} from "react";

const SidebarContext = createContext({
    isOpen: true,
    toggleSidebar: () => {},
});

type NavbarProps = {
    className?: string;
    children?: React.ReactNode;
};

export const Root = function NavbarRoot({ className = "", children }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            <div className={`flex flex-row min-h-screen overflow-x-hidden ${className}`}>
                {children}
            </div>
        </SidebarContext.Provider>
    );
};

export const Navbar = function Navbar({ className = "" }: NavbarProps) {
    const { isOpen, toggleSidebar } = useContext(SidebarContext);

    return (
        <nav
            className={`
                fixed h-full flex flex-col items-center drop-shadow-xl z-50 w-64 bg-white
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                ${className}
            `}
        >
            <div className={"relative bg-primary w-full flex justify-center items-center py-5"}>
                <NavbarButton className="text-larger2" href={"/"}>LOGO</NavbarButton>

                <LuPanelLeftClose
                    size="1.25rem"
                    onClick={toggleSidebar}
                    className="absolute right-4 cursor-pointer text-white hover:opacity-80 transition-opacity"
                />
            </div>
            <div className={"bg-white w-full flex-1"}>
                <RSNavbarActions />
            </div>
        </nav>
    );
};

export const Outlet = function NavbarOutlet({ className = "", children }: NavbarProps) {
    const { isOpen, toggleSidebar } = useContext(SidebarContext);

    return (
        <div className={`flex flex-col w-full min-h-screen transition-all duration-300 ease-in-out ${isOpen ? "pl-64" : "pl-0"}`}>
            <div className="fixed top-0 z-50 bg-primary w-full flex h-12 items-center px-4 shadow-md">
                {!isOpen && (
                    <LuPanelLeftOpen className="text-white hover:opacity-80 transition-opacity mr-4 cursor-pointer"
                                     onClick={toggleSidebar}
                                     size="1.25rem" />
                )}
            </div>

            <main className={`flex-1 ${className}`}>
                {children}
            </main>
        </div>
    );
};