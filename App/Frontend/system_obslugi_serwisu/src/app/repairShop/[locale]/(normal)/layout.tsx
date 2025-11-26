import {ReactNode} from "react";
import * as RSNavbar from "@/app/Organisms/RSNavbar";


export default function RootLayout({ children}: Readonly<{ children: ReactNode; }>) {
    return (
        <RSNavbar.Root>
            <RSNavbar.Navbar/>
            <RSNavbar.Outlet className="pt-12 h-screen">
                <div className="bg-inherit h-max p-[var(--page-margin)]">
                    {children}
                </div>
            </RSNavbar.Outlet>
        </RSNavbar.Root>
    );
}