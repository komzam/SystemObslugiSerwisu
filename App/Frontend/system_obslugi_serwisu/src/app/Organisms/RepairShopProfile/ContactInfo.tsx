import {GetRepairShop} from "@/graphql/GetRepairShop";
import {useTranslations} from "next-intl";
import {Card} from "@/app/Atoms/Card";
import RepairShopInfo from "@/app/Molecules/RepairShopInfo";
import { OpeningHours } from "@/app/Types/OpeningHours";

type ContactInfoProps = {
    address:GetRepairShop["address"];
    openingHours:OpeningHours;
    timeZoneId:string;
    phone:string;
    email:string;
};


export function ContactInfo({address, openingHours, timeZoneId, phone, email}: ContactInfoProps) {
    const t = useTranslations("RepairShop");
    return(
        <Card className="flex flex-col gap-3">
            <Card.Label>{t("contactInfo")}</Card.Label>
            <RepairShopInfo.AddressWithTitle address={address}/>
            <RepairShopInfo.OpeningHours openingHours={openingHours} timeZoneId={timeZoneId}/>
            <RepairShopInfo.Contact phone={phone} email={email}/>
        </Card>
    )
}