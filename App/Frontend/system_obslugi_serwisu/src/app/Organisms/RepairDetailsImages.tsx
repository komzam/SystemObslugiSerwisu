import {LabeledCard} from "@/app/Molecules/LabeledCard";
import {useTranslations} from "next-intl";
import {ImageCarousel} from "@/app/Molecules/ImageCarousel";

export function RepairDetailsImages() {
    const t = useTranslations("RepairDetails");

    return (
        <LabeledCard label={t("images")}>
            <ImageCarousel/>
        </LabeledCard>
    )
}