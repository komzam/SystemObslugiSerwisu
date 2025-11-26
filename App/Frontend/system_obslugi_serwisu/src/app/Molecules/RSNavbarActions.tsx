"use client"

import {RSNavbarButton} from "@/app/Atoms/RSNavbarButton";
import { LuHouse, LuWrench, LuMessageSquare, LuPackage, LuCalendar} from "react-icons/lu";
import {useTranslations} from "next-intl";
import {useMemo} from "react";
import {usePathname} from "@/i18n/navigation";
import {useAuthContext} from "@/app/Utils/AuthContext";

export function RSNavbarActions(){
    const t = useTranslations("Navbar");
    const path = usePathname();
    const menuItems = useMemo(() => ([
        { name: t("dashboard"), href: '/', icon: LuHouse },
        { name: t("repairs"), href: '/repairs', icon: LuWrench },
        { name: t("messages"), href: '/messages', icon: LuMessageSquare },
        { name: t("inventory"), href: '/inventory', icon: LuPackage },
        { name: t("workSchedule"), href: '/schedule', icon: LuCalendar },
    ]), []);

    if(path == null)
        return null;

    const authContext = useAuthContext();
    console.log(authContext.isLoggedIn);
    console.log(authContext.authInfo?.__typename);

    return (
        <div className="flex flex-col gap-2 p-3">
            {menuItems.map((menuItem, index) => (
                    <RSNavbarButton key={index}
                                    href={menuItem.href}
                                    icon={<menuItem.icon size="1.5rem"/>}
                                    isHighlighted={menuItem.href === "/"? path=== "/" : path.startsWith(menuItem.href)}
                    >
                        {menuItem.name}
                    </RSNavbarButton>
            ))}
        </div>
    )
}