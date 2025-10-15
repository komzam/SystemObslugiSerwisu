import {SearchRepairShop} from "@/graphql/Search";
import {LuClock, LuMapPin, LuPhone } from "react-icons/lu";
import {ReactNode} from "react";
import {useTranslations} from "next-intl";
import {GetRepairShop} from "@/graphql/GetRepairShop";

export type AddressProps = {
    className?: string;
    address: SearchRepairShop["address"];
}

export function Address({className="", address}: AddressProps) {
    return (
        <div className={`flex flex-row items-center gap-2 ${className}`}>
            <LuMapPin className="text-accent4"/>
            <p>{address.street} {address.buildingNumber}{address.apartmentNumber!=null && "/" + address.apartmentNumber}, {address.postalCode} {address.city}</p>
        </div>
    )
}

type IconAndTitleProps = {icon:ReactNode; title:string; children: ReactNode};
function IconAndTitle({icon, title, children}: IconAndTitleProps) {
    return (
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
            {icon}
            <p className="font-bold">{title}</p>
            <div className="col-start-2">
                {children}
            </div>
        </div>
    )
}

export function AddressWithTitle({address}: AddressProps) {
    const t = useTranslations("RepairShop");
    return (
        <IconAndTitle icon={<LuMapPin className="text-accent4"/>} title={t("address")}>
            <p>{address.street} {address.buildingNumber}{address.apartmentNumber!=null && "/" + address.apartmentNumber}, {address.postalCode} {address.city}</p>
        </IconAndTitle>
    )
}

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

export type ContactProps = {phone:string, email:string}
export function Contact({phone, email}: ContactProps) {
    const t = useTranslations("RepairShop");
    return(
        <IconAndTitle icon={<LuPhone className="text-accent4"/>} title={t("contact")}>
            <p>{phone}</p>
            <p>{email}</p>
        </IconAndTitle>
    )
}