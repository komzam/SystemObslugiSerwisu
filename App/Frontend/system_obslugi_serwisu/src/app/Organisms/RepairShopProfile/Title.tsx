import {useTranslations} from "next-intl";
import {GetRepairShop} from "@/graphql/GetRepairShop";
import {Card} from "@/app/Atoms/Card";
import {Button} from "@/app/Atoms/Button";
import {LuMessageSquare, LuWrench} from "react-icons/lu";
import * as RepairShopElementInfo from "@/app/Molecules/RepairShopElementInfo";

export type TitleProps = {
    name: string;
    numberOfStars: number;
    numberOfReviews: number;
    address: GetRepairShop["address"];
}

export function Title({name, numberOfStars, numberOfReviews, address}: TitleProps) {
    const t = useTranslations("RepairShop");

    return(
        <div className="flex flex-col w-full">
            <div className="bg-accent4 rounded-t-xl h-64"></div>
            <Card className="flex flex-col rounded-t-none md:flex-row gap-3">
                <div className="flex-1 flex flex-col gap-2">
                    <RepairShopElementInfo.Title>{name}</RepairShopElementInfo.Title>
                    <RepairShopElementInfo.RatingRoot>
                        <RepairShopElementInfo.RatingStars numberOfStars={numberOfStars}/>
                        <RepairShopElementInfo.RatingSeparator/>
                        <RepairShopElementInfo.RatingReviews numberOfReviews={numberOfReviews}/>
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
