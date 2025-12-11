import {Card} from "@/components/Atoms/Card";
import {KeyValueLine} from "@/components/Molecules/KeyValueLine";
import {useTranslations} from "next-intl";

type PartDetailsDetailsProps = {
    price: number,
    lowStockThreshold: number,
    manufacturerCode: string
}

export function PartDetailsDetails({price, lowStockThreshold, manufacturerCode}: PartDetailsDetailsProps) {
    const t = useTranslations("PartDetails");

    return (
        <Card>
            <Card.Label>{t("partDetails")}</Card.Label>
            <div className={`grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-2 sm:gap-x-5 w-full`}>
                <KeyValueLine wrapperClassName="w-full" label={t("unitPrice")} valueBold={true} value={price.toString()} />
                <KeyValueLine wrapperClassName="w-full" label={t("lowStockThreshold")} valueBold={true} value={lowStockThreshold.toString()} />
                <KeyValueLine wrapperClassName="w-full" label={t("manufacturersCode")} valueBold={true} valueHightlighted={true} value={manufacturerCode} />
            </div>
        </Card>
    );
}