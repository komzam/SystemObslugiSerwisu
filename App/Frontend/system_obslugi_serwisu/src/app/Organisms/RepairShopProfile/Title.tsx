import {useTranslations} from "next-intl";
import {Card} from "@/app/Atoms/Card";
import {Button} from "@/app/Atoms/Button";
import {LuMessageSquare, LuWrench} from "react-icons/lu";
import * as RepairShopElementInfo from "@/app/Molecules/RepairShopElementInfo";
import RepairShopInfo from "@/app/Molecules/RepairShopInfo";
import {GetRepairShopQuery} from "@/__generated__/types";
import {Link} from "@/i18n/navigation";

export type TitleProps = {
    name: GetRepairShopQuery["repairShop"]["name"];
    repairShopId: GetRepairShopQuery["repairShop"]["id"];
    rating: GetRepairShopQuery["repairShop"]["rating"];
    reviewCount: GetRepairShopQuery["repairShop"]["reviewCount"];
    address: GetRepairShopQuery["repairShop"]["address"];
    timeZoneId: GetRepairShopQuery["repairShop"]["timeZoneId"];
    openingHours: GetRepairShopQuery["repairShop"]["openingHours"];
}

export function Title({name, repairShopId, rating, reviewCount, address, timeZoneId, openingHours}: TitleProps) {
    const t = useTranslations("RepairShop");

    return(
        <div className="flex flex-col w-full">
            <div className="bg-accent4 rounded-t-xl h-64"></div>
            <Card className="flex flex-col rounded-t-none md:flex-row gap-3">
                <div className="flex-1 flex flex-col gap-2">
                    <RepairShopElementInfo.Title>{name}</RepairShopElementInfo.Title>
                    <RepairShopElementInfo.RatingRoot>
                        <RepairShopElementInfo.RatingStars numberOfStars={rating}/>
                        <RepairShopElementInfo.RatingSeparator/>
                        <RepairShopElementInfo.RatingReviews numberOfReviews={reviewCount}/>
                    </RepairShopElementInfo.RatingRoot>
                    <RepairShopElementInfo.Address address={address}/>
                    <RepairShopInfo.IsOpen openingHours={openingHours} timeZoneId={timeZoneId}/>
                </div>
                <div className="flex flex-col md:flex-row h-fit gap-2">
                    <Button variant="secondary" icon={<LuMessageSquare size="18px"/>}>{t("contactRepairShop")}</Button>
                    <Link href={`/repairShop/${repairShopId}/bookRepair`} className="w-full md:w-fit">
                        <Button className="w-full md:w-fit" icon={<LuWrench size="18px"/>}>{t("bookARepair")}</Button>
                    </Link>
                </div>
            </Card>
        </div>
    )
}
