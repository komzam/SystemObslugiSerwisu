import {Card} from "@/app/Atoms/Card";
import * as RepairShopElementInfo from "@/app/Molecules/RepairShopElementInfo";
import {SearchRepairShop} from "@/graphql/Search";

export type RepairShopCardProps = {
    repairShop:SearchRepairShop
}

export function RepairShopCard({repairShop}: RepairShopCardProps) {
    return(
        <div className={"flex flex-col sm:flex-row shadow-md rounded-xl w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]"}>
            <div className=" bg-accent4 rounded-t-xl sm:rounded-r-none sm:rounded-l-xl h-48 sm:h-auto sm:w-96"></div>
            <Card className="shadow-none rounded-t-none sm:rounded-l-none w-full">
                <RepairShopElementInfo.Root>
                    <div>
                        <RepairShopElementInfo.Title>{repairShop.name}</RepairShopElementInfo.Title>
                        <RepairShopElementInfo.RatingRoot>
                            <RepairShopElementInfo.RatingStars numberOfStars={4.8}/>
                            <RepairShopElementInfo.RatingSeparator/>
                            <RepairShopElementInfo.RatingReviews numberOfReviews={125}/>
                        </RepairShopElementInfo.RatingRoot>
                    </div>
                    <div className="flex flex-col gap-1">
                        <RepairShopElementInfo.Address address={repairShop.address}/>
                        <RepairShopElementInfo.IsOpen/>
                    </div>
                    <RepairShopElementInfo.SeeProfileButton repairShopId={repairShop.id}/>
                </RepairShopElementInfo.Root>
            </Card>
        </div>
    )
}