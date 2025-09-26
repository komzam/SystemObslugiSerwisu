import {Card} from "@/app/Atoms/Card";
import {useTranslations} from "next-intl";
import {ImageCarousel} from "@/app/Molecules/ImageCarousel";

export function RepairDetailsImages() {
    const t = useTranslations("RepairDetails");

    return (
        <Card>
            <Card.Label>{t("images")}</Card.Label>
            <ImageCarousel/>
        </Card>
    )
}