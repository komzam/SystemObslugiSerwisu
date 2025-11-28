import {Card} from "@/components/Atoms/Card";
import * as RepairShopElementInfo from "@/components/Molecules/RepairShopElementInfo";
import {SearchQuery} from "@/__generated__/types";
import Image from "next/image";

export type RepairShopCardProps = {
    repairShop:SearchQuery["searchShopsByName"]["items"][number];
    imagePriority: boolean;
}

export function RepairShopCard({repairShop, imagePriority}: RepairShopCardProps) {
    return(
        <div className={"flex flex-col sm:flex-row shadow-md rounded-xl w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]"}>
            <div className="relative rounded-t-xl sm:rounded-r-none sm:rounded-l-xl h-48 sm:h-auto sm:w-96">
                {repairShop.miniatureImage?
                    <Image className="rounded-t-xl sm:rounded-r-none sm:rounded-l-xl"
                           alt="image"
                           fill
                           sizes="(max-width: 768px) 100vw, 320px"
                           priority={imagePriority}
                           src={repairShop.miniatureImage.small} />
                    :
                    <div className="w-full h-full flex justify-center items-center rounded-t-xl sm:rounded-r-none sm:rounded-l-xl bg-accent3">
                        <p className="text-larger1 font-extrabold text-accent4">?</p>
                    </div>
                }
            </div>
            <Card className="shadow-none rounded-t-none sm:rounded-l-none sm:rounded-r-xl w-full">
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