import {useTranslations} from "next-intl";
import {KeyValueList} from "@/app/Molecules/KeyValueList";

export type PriceListProps = { priceList: {service:string; price:number;}[]; }
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