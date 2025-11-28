import {Card} from "@/components/Atoms/Card";
import {useTranslations} from "next-intl";
import {ImageCarousel, ImageProps} from "@/components/Molecules/ImageCarousel";
import {GetRepairQuery} from "@/__generated__/types";

export type RepairDetailsImagesProps = {
    images: GetRepairQuery["repair"]["images"];
}

export function RepairDetailsImages({images}: RepairDetailsImagesProps) {
    const t = useTranslations("RepairDetails");

    const imageList:ImageProps[] =[];
    for(const image of images){
        imageList.push({
            smallSrc:image.small,
            biggerSrc:image.extraLarge
        });
    }

    return (
        <Card>
            <Card.Label>{t("images")}</Card.Label>
            <ImageCarousel images={imageList}/>
        </Card>
    )
}