import {GetRepairShop} from "@/graphql/GetRepairShop";
import {useTranslations} from "next-intl";
import {Card} from "@/app/Atoms/Card";
import {AddressWithTitle, Contact, OpeningHours} from "@/app/Molecules/RepairShopInfo";

type ContactInfoProps = {
    address:GetRepairShop["address"];
    openingHours:GetRepairShop["openingHours"];
    phone:string;
    email:string;
};


export function ContactInfo({address, openingHours, phone, email}: ContactInfoProps) {
    const t = useTranslations("RepairShop");
    return(
        <Card className="flex flex-col gap-3">
            <Card.Label>{t("contactInfo")}</Card.Label>
            <AddressWithTitle address={address}/>
            <OpeningHours openingHours={openingHours}/>
            <Contact phone={phone} email={email}/>
        </Card>
    )
}