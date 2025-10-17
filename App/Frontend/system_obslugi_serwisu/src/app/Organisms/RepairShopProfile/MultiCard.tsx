import {useTranslations} from "next-intl";
import {AboutUs, AboutUsProps} from "@/app/Organisms/RepairShopProfile/AboutUs";
import {PriceList, PriceListProps} from "@/app/Organisms/RepairShopProfile/PriceList";
import {Reviews, ReviewsProps} from "@/app/Organisms/RepairShopProfile/Reviews";
import * as CardWithTabs from "@/app/Molecules/CardWithTabs";

type MultiCardProps = {
    aboutUs: AboutUsProps;
    priceList: PriceListProps;
    reviews: ReviewsProps;
};
export function MultiCard({aboutUs, priceList, reviews}: MultiCardProps) {
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