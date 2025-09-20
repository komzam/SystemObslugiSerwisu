"use client"

import * as React from "react";
import {Dropdown2, Dropdown2Items} from "@/app/Molecules/Dropdown2";
import {NavbarButton} from "@/app/Atoms/NavbarButton";
import { logOut } from "@/app/Utils/Utils"
import {LuBell, LuChevronDown, LuAlignJustify} from "react-icons/lu";
import {useRouter} from "@/i18n/navigation";
import {useTranslations} from "next-intl";


export function NavbarActions() {
    const isLoggedIn = false;
    const t = useTranslations( "Navbar" );
    const router = useRouter();

    const shrinkedMenu : Dropdown2Items = [
        { valueLabel: t("repairs"), onClick: () => router.push("/repairs")},
        { valueLabel: t("messages"), onClick: () => router.push("/repairs")},
        ...(!isLoggedIn ? [{ valueLabel: t("signIn"), onClick: () => router.push("/signIn")}] : [])
    ]

    const myAccountButtons : Dropdown2Items = [
        { valueLabel: t("editAccount"), onClick: () => router.push("/editAccount")},
        { valueLabel: t("logOut"), onClick: () => logOut() }
    ]


    return (
        <div>
            <div className="md:flex md:flex-row md:items-center md:gap-5 hidden">

                <NavbarButton href="/repairs">{t("repairs")}</NavbarButton>
                <NavbarButton href="/messages">{t("messages")}</NavbarButton>

                {isLoggedIn && <LuBell className="text-white" size="20px"/>}

                {isLoggedIn ?
                    <Dropdown2 items={myAccountButtons} classNamePortal={"w-full"} triggerText={t("myAccount")}
                               classNameTrigger="text-white flex flex-row items-center gap-0.5" triggerIcon={<LuChevronDown size="24px" />}/>
                    :
                    <NavbarButton href={"/signIn"}>{t("signIn")}</NavbarButton>}
            </div>
            <div className="flex flex-row gap-5 items-center md:hidden">
                {isLoggedIn && <LuBell className="text-white" size="20px"/>}

                <Dropdown2 items={isLoggedIn ? [...shrinkedMenu, ...myAccountButtons]: shrinkedMenu} classNamePortal={"w-full"}
                           triggerIcon={<LuAlignJustify size="24px" className={"text-white"} />}/>
            </div>
        </div>
    );
}