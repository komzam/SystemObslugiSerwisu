import {useTranslations} from "next-intl";
import {LuClock} from "react-icons/lu";
import {IconAndTitle} from "./IconAndTitle";
import {OpeningHours as OpeningHoursType} from "@/app/Types/OpeningHours";
import {DateTime} from "luxon";

export type OpeningHoursProps = {
    openingHours:OpeningHoursType;
    timeZoneId: string;
}
export function OpeningHours({openingHours, timeZoneId}: OpeningHoursProps) {
    const t = useTranslations("RepairShop");
    const userTimeZone = DateTime.now().zone;

    const formatTime = (dayName:string, day: {from: string; to: string} | null) => {
        if(day === null)
            return <p>{t(dayName)}: t("closed")</p>

        const open = DateTime.fromFormat(day.from, "HH:mm", {zone: timeZoneId}).setZone(userTimeZone);
        const close = DateTime.fromFormat(day.to, "HH:mm", {zone: timeZoneId}).setZone(userTimeZone);

        return <p>{t(dayName)}: {`${open.toFormat("HH:mm")} - ${close.toFormat("HH:mm")}`}</p>
    };

    return(
        <IconAndTitle icon={<LuClock className="text-accent4"/>} title={t("openingHours")}>
            {formatTime("monday", openingHours.monday)}
            {formatTime("tuesday", openingHours.tuesday)}
            {formatTime("wednesday", openingHours.wednesday)}
            {formatTime("thursday", openingHours.thursday)}
            {formatTime("friday", openingHours.friday)}
            {formatTime("saturday", openingHours.saturday)}
            {formatTime("sunday", openingHours.sunday)}
        </IconAndTitle>
    )
}