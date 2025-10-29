import {Card} from "@/app/Atoms/Card";
import * as RepairShopElementInfo from "@/app/Molecules/RepairShopElementInfo";
import {SearchQuery} from "@/__generated__/types";

export type RepairShopCardProps = {
    repairShop:SearchQuery["searchShopsByName"]["items"][number];
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
                            <RepairShopElementInfo.RatingStars numberOfStars={repairShop.rating}/>
                            <RepairShopElementInfo.RatingSeparator/>
                            <RepairShopElementInfo.RatingReviews numberOfReviews={repairShop.reviewCount}/>
                        </RepairShopElementInfo.RatingRoot>
                    </div>
                    <div className="flex flex-col gap-1">
                        <RepairShopElementInfo.Address address={repairShop.address}/>
                        <RepairShopElementInfo.IsOpen timeZoneId={repairShop.timeZoneId} openingHours={repairShop.openingHours}/>
                    </div>
                    <RepairShopElementInfo.SeeProfileButton repairShopId={repairShop.id}/>
                </RepairShopElementInfo.Root>
            </Card>
        </div>
    )
}