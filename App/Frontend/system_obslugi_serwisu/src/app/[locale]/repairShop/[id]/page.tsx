import RepairShopProfile from "@/app/Organisms/RepairShopProfile";
import client from "@/graphql/ApolloClient";
import {GET_REPAIRSHOP} from "@/graphql/GetRepairShop";
import {GetRepairShopQuery, GetRepairShopQueryVariables} from "@/__generated__/types";

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
        <div className="bg-inherit flex justify-center">
            <div className="flex flex-col gap-10 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                <RepairShopProfile.Title
                    name={repairShop.name}
                    imageUrl={repairShop.repairShopImage}
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