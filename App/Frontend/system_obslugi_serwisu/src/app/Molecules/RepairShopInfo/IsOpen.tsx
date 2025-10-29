"use client"

import {useTranslations} from "next-intl";
import {LuClock} from "react-icons/lu";
import {OpenStatus} from "@/app/Molecules/OpenStatus";
import {DateTime} from "luxon";
import {GetRepairShopQuery, OpeningHoursDto} from "@/__generated__/types";

export type IsOpenProps = {
    openingHours: GetRepairShopQuery["repairShop"]["openingHours"];
    timeZoneId: GetRepairShopQuery["repairShop"]["timeZoneId"];
    className?: string;
}

function getTodayInterval(openStr: string, closeStr: string, repairShopTimeZone: string) {
    const today = DateTime.now().setZone(repairShopTimeZone).startOf("day");

    const open = today.plus({
        hours: parseInt(openStr.split(":")[0]),
        minutes: parseInt(openStr.split(":")[1]),
    });
    const close = today.plus({
        hours: parseInt(closeStr.split(":")[0]),
        minutes: parseInt(closeStr.split(":")[1]),
    });
    return { open, close };
}

export function IsOpen({openingHours, timeZoneId, className=""}: IsOpenProps) {
    const t = useTranslations("RepairShop");
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

    const now = DateTime.now().setZone(timeZoneId);
    const userTimeZone = DateTime.now().zone;
    const weekday = now.weekday-1; // 0-6
    const today: keyof OpeningHoursDto = days[weekday];
    const tomorrow: keyof OpeningHoursDto = days[(weekday+1)%7];

    let isOpen:boolean;
    let changeTime: string| null = null;

    if(openingHours[today] != null) {
        const todayInterval = getTodayInterval(openingHours[today].from, openingHours[today].to, timeZoneId);
        if(now < todayInterval.open) {
            const opening = todayInterval.open.setZone(userTimeZone);
            isOpen = false;
            changeTime = `${String(opening.hour).padStart(2, "0")}:${String(opening.minute).padStart(2, "0")}`;
        }else if(now < todayInterval.close) {
            const closing = todayInterval.close.setZone(userTimeZone);
            isOpen = true;
            changeTime = `${String(closing.hour).padStart(2, "0")}:${String(closing.minute).padStart(2, "0")}`;
        }else{
            isOpen = false;
            if(openingHours[tomorrow] != null) {
                const tomorrowOpen = now.plus({days: 1}).startOf("day").plus({
                    hours: parseInt(openingHours[tomorrow].from.split(":")[0]),
                    minutes: parseInt(openingHours[tomorrow].from.split(":")[1]),
                }).setZone(userTimeZone);
                changeTime = `${String(tomorrowOpen.hour).padStart(2, "0")}:${String(tomorrowOpen.minute).padStart(2, "0")}`;
            }
        }
    }else{
        isOpen = false;
        if(openingHours[tomorrow] != null) {
            const tomorrowOpen = now.plus({days: 1}).startOf("day").plus({
                hours: parseInt(openingHours[tomorrow].from.split(":")[0]),
                minutes: parseInt(openingHours[tomorrow].from.split(":")[1]),
            }).setZone(userTimeZone);
            changeTime = `${String(tomorrowOpen.hour).padStart(2, "0")}:${String(tomorrowOpen.minute).padStart(2, "0")}`;
        }
    }

    return (
        <div className={`flex flex-row items-center gap-3 ${className}`}>
            <div className="flex flex-row items-center gap-2">
                <LuClock className="text-accent4"/>
                <OpenStatus isOpen={isOpen}/>
            </div>
            {changeTime && <p>{isOpen? t("closesAt") : t("opensAt")} {changeTime}</p>}
        </div>
    )
}