import * as RepairShopProfile from "@/app/Organisms/RepairShopProfile";
import client from "@/graphql/ApolloClient";
import {GET_REPAIRSHOP, GetRepairShopQuery} from "@/graphql/GetRepairShop";
import {useTranslations} from "next-intl";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function RepairShop({params}: PageProps) {
    const { id } = await params;
    const { data } = await client.query<GetRepairShopQuery>({query: GET_REPAIRSHOP, variables:{id:id}});

    return (
        <div className="bg-inherit p-[var(--page-margin)] flex justify-center">
            <div className="flex flex-col gap-10 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                {data!=null && <RepairShopProfile.Title name={data.repairShop.name} numberOfStars={4.8} numberOfReviews={125} address={data.repairShop.address} />}
                <RepairShopProfile.MutliCard aboutUs={{aboutUs:"This is our little shop"}} priceList={{priceList:[{service:"Laptop cleaning", price:150},{service:"Laptop cleaning", price:150},{service:"Laptop cleaning", price:150}]}} reviews={{reviews:[{reviewer:"Jacek T",review:"Best repair shop ever", rating:4}, {reviewer:"Jacek T",review:"Best repair shop ever", rating:4}]}}/>
                {data!=null && <RepairShopProfile.ContactInfo address={data.repairShop.address} openingHours={data.repairShop.openingHours} phone={data.repairShop.phone} email={data.repairShop.email}/>}
            </div>
        </div>
    )
}