import {ReactNode} from "react";
import * as RSNavbar from "@/components/Organisms/RSNavbar";
import {ProtectedRoute} from "@/components/Utils/ProtectedRoute";
import {WorkerShopGuard} from "@/components/Utils/WorkerShopGuard";
import {ToastProvider} from "@/components/Utils/ToastNotifications";


export default function RootLayout({ children}: Readonly<{ children: ReactNode; }>) {
    return (
        <ProtectedRoute>
            <WorkerShopGuard>
                <ToastProvider>
                    <RSNavbar.Root>
                        <RSNavbar.Navbar/>
                        <RSNavbar.Outlet className="pt-12 h-screen">
                            <div className="bg-inherit h-max p-[var(--page-margin)]">
                                {children}
                            </div>
                        </RSNavbar.Outlet>
                    </RSNavbar.Root>
                </ToastProvider>
            </WorkerShopGuard>
        </ProtectedRoute>
    );
}