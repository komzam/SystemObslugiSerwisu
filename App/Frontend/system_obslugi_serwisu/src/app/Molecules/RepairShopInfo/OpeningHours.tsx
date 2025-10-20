import {GetRepairShop} from "@/graphql/GetRepairShop";
import {useTranslations} from "next-intl";
import {LuClock} from "react-icons/lu";
import {IconAndTitle} from "./IconAndTitle";

export type OpeningHoursProps = {openingHours:GetRepairShop["openingHours"]}
export function OpeningHours({openingHours}: OpeningHoursProps) {
    const t = useTranslations("RepairShop");

    const formatTime = (dayName:string, day: {from: string; to: string} | null) => (
        <p>{t(dayName)}: {day == null? t("closed") : `${day.from} - ${day.to}`}</p>
    );

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