import RepairShopProfile from "@/app/Organisms/RepairShopProfile";
import client from "@/graphql/ApolloClient";
import {GET_REPAIRSHOP, GetRepairShopQuery} from "@/graphql/GetRepairShop";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function RepairShop({params}: PageProps) {
    const { id } = await params;
    const { data } = await client.query<GetRepairShopQuery>({query: GET_REPAIRSHOP, variables:{id:id}, fetchPolicy:"network-only"});

    return (
        <div className="bg-inherit p-[var(--page-margin)] flex justify-center">
            <div className="flex flex-col gap-10 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                {data!=null && <RepairShopProfile.Title name={data.repairShop.name} numberOfStars={data.repairShop.rating} numberOfReviews={data.repairShop.reviewCount} address={data.repairShop.address} />}
                {data!=null && <RepairShopProfile.MultiCard reviews={{repairShopId:id}} aboutUs={{aboutUs:data.repairShop.aboutUs}} priceList={{priceList:[{service:"Laptop cleaning", price:150},{service:"Laptop cleaning", price:150},{service:"Laptop cleaning", price:150}]}}/>}
                {data!=null && <RepairShopProfile.ContactInfo address={data.repairShop.address} openingHours={data.repairShop.openingHours} phone={data.repairShop.phone} email={data.repairShop.email}/>}
            </div>
        </div>
    )
}