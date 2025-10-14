import {Card} from "@/app/Atoms/Card";
import * as RepairShopElementInfo from "@/app/Molecules/RepairShopElementInfo";

export function RepairShopCard(){
    return(
        <div className={"flex flex-col sm:flex-row shadow-md"}>
            <div className=" bg-accent4 sm:rounded-l-xl w-96 h-48"></div>
            <Card className="shadow-none rounded-l-none w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                <RepairShopElementInfo.Root>
                    <div>
                        <RepairShopElementInfo.Title>Mistrzowie Ekranu</RepairShopElementInfo.Title>
                        <RepairShopElementInfo.RatingRoot>
                            <RepairShopElementInfo.RatingStars numberOfStars={4.8}/>
                            <RepairShopElementInfo.RatingSeparator/>
                            <RepairShopElementInfo.RatingReviews numberOfReviews={125}/>
                        </RepairShopElementInfo.RatingRoot>
                    </div>
                    <div>
                        <RepairShopElementInfo.Address street={"Złota"} buildingNumber={"59"} postalCode={"00-120"} city={"Warszawa"}/>
                        <RepairShopElementInfo.IsOpen/>
                    </div>
                    <RepairShopElementInfo.SeeProfileButton repairShopId={"AAA"}/>
                </RepairShopElementInfo.Root>
            </Card>
        </div>
    )
}