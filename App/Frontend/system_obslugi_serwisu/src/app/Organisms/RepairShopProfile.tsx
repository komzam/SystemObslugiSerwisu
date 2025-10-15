import { Card } from "../Atoms/Card";
import * as RepairShopElementInfo from "@/app/Molecules/RepairShopElementInfo";
import {GetRepairShop} from "@/graphql/GetRepairShop";
import {Button} from "@/app/Atoms/Button";
import {useTranslations} from "next-intl";
import {LuMessageSquare, LuWrench} from "react-icons/lu";
import * as CardWithTabs from "@/app/Molecules/CardWithTabs";
import {KeyValueList} from "@/app/Molecules/KeyValueList";
import {Stars} from "@/app/Molecules/Stars";
import {AddressWithTitle, Contact, OpeningHours} from "@/app/Molecules/RepairShopInfo";

export type TitleProps = {
    name: string;
    numberOfStars: number;
    numberOfReviews: number;
    address: GetRepairShop["address"];
}

export function Title({name, address}: TitleProps) {
    const t = useTranslations("RepairShop");

    return(
        <div className="flex flex-col w-full">
            <div className="bg-accent4 rounded-t-xl h-64"></div>
            <Card className="flex flex-col rounded-t-none md:flex-row gap-3">
                <div className="flex-1 flex flex-col gap-2">
                    <RepairShopElementInfo.Title>{name}</RepairShopElementInfo.Title>
                    <RepairShopElementInfo.RatingRoot>
                        <RepairShopElementInfo.RatingStars numberOfStars={4.8}/>
                        <RepairShopElementInfo.RatingSeparator/>
                        <RepairShopElementInfo.RatingReviews numberOfReviews={125}/>
                    </RepairShopElementInfo.RatingRoot>
                    <RepairShopElementInfo.Address address={address}/>
                </div>
                <div className="flex flex-col md:flex-row h-fit gap-2">
                    <Button variant="secondary" icon={<LuMessageSquare size="18px"/>}>{t("contactRepairShop")}</Button>
                    <Button icon={<LuWrench size="18px"/>}>{t("bookARepair")}</Button>
                </div>
            </Card>
        </div>
    )
}

type MultiCardProps = {
    aboutUs: AboutUsProps;
    priceList: PriceListProps;
    reviews: ReviewsProps;
};
export function MutliCard({aboutUs, priceList, reviews}: MultiCardProps) {
    const t = useTranslations("RepairShop");

    return (
        <CardWithTabs.Root defaultTabName="aboutUs">
            <CardWithTabs.TabsList>
                <CardWithTabs.Trigger buttonText={t("aboutUs")} tabName="aboutUs"/>
                <CardWithTabs.Trigger buttonText={t("priceList")} tabName="priceList"/>
                <CardWithTabs.Trigger buttonText={t("reviewsTab")} tabName="reviews"/>
            </CardWithTabs.TabsList>
            <CardWithTabs.Content tabName="aboutUs">
                <AboutUs {...aboutUs}/>
            </CardWithTabs.Content>
            <CardWithTabs.Content tabName="priceList">
                <PriceList {...priceList}/>
            </CardWithTabs.Content>
            <CardWithTabs.Content tabName="reviews">
                <Reviews {...reviews}/>
            </CardWithTabs.Content>
        </CardWithTabs.Root>
    )
}


type AboutUsProps = { aboutUs: string; }
export function AboutUs({aboutUs}: AboutUsProps) {
    const t = useTranslations("RepairShop");
    return (
        <div className="flex flex-col gap-3">
            <p className={"text-larger2 font-bold"}>{t("aboutOurRepairShop")}</p>
            <p>{aboutUs}</p>
        </div>
    )
}

type PriceListProps = { priceList: {service:string; price:number;}[]; }
export function PriceList({priceList}: PriceListProps) {
    const t = useTranslations("RepairShop");
    const kvProps = priceList.map((priceListEntry) =>
                                    ({label:priceListEntry.service, value: priceListEntry.price.toString(), labelBold:true}));
    return (
        <div className="w-[clamp(2rem,100%,40rem)]">
            {kvProps.length == 0 ?
                <p>{t("noPriceList")}</p>
                    :
                <KeyValueList items={kvProps} useSeparator={true}/>
            }
        </div>
    )
}

type ReviewProps = {reviewer: string, review:string; rating:number;}
function Review({reviewer, review, rating}: ReviewProps) {
    return(
        <div className="flex flex-col gap-2">
            <RepairShopElementInfo.RatingRoot>
                <p className="font-bold">{reviewer}</p>
                <Stars numberOfStars={rating}/>
            </RepairShopElementInfo.RatingRoot>
            <p className="line-clamp-3 wrap-break-word">{review}</p>
        </div>
    )
}

type ReviewsProps = { reviews: {reviewer:string; review: string; rating:number;}[]; }
export function Reviews({reviews}:ReviewsProps){
    const t = useTranslations("RepairShop");
    return (
        <div className="flex flex-col gap-5">
            {reviews.length == 0 ?
                <p>{t("noReviews")}</p>
                    :
                reviews.map((reviewEntry, reviewIndex) => (
                    <Review key={reviewIndex} {...reviewEntry}/>
                ))
            }
        </div>
    )
}

type ContactInfoProps = {address:GetRepairShop["address"], openingHours:GetRepairShop["openingHours"], phone:string, email:string};
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