import {useTranslations} from "next-intl";
import {AboutUs, AboutUsProps} from "@/components/Organisms/RepairShopProfile/AboutUs";
import {PriceList, PriceListProps} from "@/components/Organisms/RepairShopProfile/PriceList";
import {Reviews, ReviewsProps} from "@/components/Organisms/RepairShopProfile/Reviews";
import * as CardWithTabs from "@/components/Molecules/CardWithTabs";

type MultiCardProps = {
    aboutUsProps: AboutUsProps;
    priceListProps: PriceListProps;
    reviewsProps: ReviewsProps;
};
export function MultiCard({aboutUsProps, priceListProps, reviewsProps}: MultiCardProps) {
    const t = useTranslations("RepairShop");
    return (
        <CardWithTabs.Root defaultTabName="aboutUs">
            <CardWithTabs.TabsList>
                <CardWithTabs.Trigger buttonText={t("aboutUs")} tabName="aboutUs"/>
                <CardWithTabs.Trigger buttonText={t("priceList")} tabName="priceList"/>
                <CardWithTabs.Trigger buttonText={t("reviewsTab")} tabName="reviews"/>
            </CardWithTabs.TabsList>
            <CardWithTabs.Content tabName="aboutUs">
                <AboutUs {...aboutUsProps}/>
            </CardWithTabs.Content>
            <CardWithTabs.Content tabName="priceList">
                <PriceList {...priceListProps}/>
            </CardWithTabs.Content>
            <CardWithTabs.Content tabName="reviews">
                <Reviews {...reviewsProps}/>
            </CardWithTabs.Content>
        </CardWithTabs.Root>
    )
}