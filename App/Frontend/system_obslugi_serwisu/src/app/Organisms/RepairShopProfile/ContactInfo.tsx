import {useTranslations} from "next-intl";
import {Card} from "@/app/Atoms/Card";
import RepairShopInfo from "@/app/Molecules/RepairShopInfo";
import {GetRepairShopQuery} from "@/__generated__/types";

type ContactInfoProps = {
    address:GetRepairShopQuery["repairShop"]["address"];
    openingHours:GetRepairShopQuery["repairShop"]["openingHours"];
    timeZoneId:GetRepairShopQuery["repairShop"]["timeZoneId"];
    phone:GetRepairShopQuery["repairShop"]["phone"];
    email:GetRepairShopQuery["repairShop"]["email"];
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