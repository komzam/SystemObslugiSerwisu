import RepairShopProfile from "@/app/Organisms/RepairShopProfile";
import client from "@/graphql/ApolloClient";
import {GET_REPAIRSHOP} from "@/graphql/GetRepairShop";
import {GetRepairShopQuery, GetRepairShopQueryVariables} from "@/__generated__/types";
import Image from "next/image";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function RepairShop({params}: PageProps) {
    const { id } = await params;

    let data;
    try {
        const result = await client.query<GetRepairShopQuery,GetRepairShopQueryVariables>({
            query: GET_REPAIRSHOP,
            variables: {id: id},
            fetchPolicy: "network-only"
        });

        data = result.data;
    }catch {
        return <p>ERROR</p>
    }

    if(!data)
        return <p>ERROR</p>;

    const repairShop = data.repairShop;

    return (
        <div className="bg-inherit flex flex-col items-center">
            <div className="-mt-[var(--page-margin)] absolute w-full h-150 overflow-hidden z-0">
                <div className="h-full bg-accent4"></div>
                <Image
                    src={repairShop.mainImage.large}
                    alt="Repair shop image"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-70% to-background"></div>
            </div>
            <div className="mt-100 flex flex-col gap-10 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)] z-1">
                <RepairShopProfile.Title
                    name={repairShop.name}
                    repairShopId={repairShop.id}
                    rating={repairShop.rating}
                    reviewCount={repairShop.reviewCount}
                    address={repairShop.address}
                    timeZoneId={repairShop.timeZoneId}
                    openingHours={repairShop.openingHours}/>

                <RepairShopProfile.MultiCard
                    reviewsProps={{repairShopId:repairShop.id}}
                    aboutUsProps={{aboutUs:repairShop.aboutUs}}
                    priceListProps={{repairShopId:repairShop.id}}/>

                <RepairShopProfile.ContactInfo
                    address={repairShop.address}
                    openingHours={repairShop.openingHours}
                    timeZoneId={repairShop.timeZoneId}
                    phone={repairShop.phone}
                    email={repairShop.email}/>
            </div>
        </div>
    )
}