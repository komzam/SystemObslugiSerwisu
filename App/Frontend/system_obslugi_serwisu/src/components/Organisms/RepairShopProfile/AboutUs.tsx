import {useTranslations} from "next-intl";
import {GetRepairShopQuery} from "@/__generated__/types";

export type AboutUsProps = { aboutUs?: GetRepairShopQuery["repairShop"]["aboutUs"]; }
export function AboutUs({aboutUs}: AboutUsProps) {
    const t = useTranslations("RepairShop");
    return (
        <div className="flex flex-col gap-3">
            <p className={"text-larger2 font-bold"}>{t("aboutOurRepairShop")}</p>
            {aboutUs != null ? <p>{aboutUs}</p> : <p>{t("noAboutUs")}</p>}
        </div>
    )
}