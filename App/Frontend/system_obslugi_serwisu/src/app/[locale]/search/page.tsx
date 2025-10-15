"use client"

import {RepairShopCard} from "@/app/Organisms/RepairShopCard";
import {SEARCH, SearchQuery} from "@/graphql/Search";
import {useQuery} from "@apollo/client/react";
import {useSearchParams} from "next/navigation";

type SeachParams = {
    searchParams: {
        name?: string,
        address?: string,
        page: number
    };
}


export default function Search() {
    let searchParams = useSearchParams();
    const { loading, error, data } = useQuery<SearchQuery>(SEARCH, {variables:{name:searchParams.get("name"), pageNumber:Number(searchParams.get("page")), pageSize: 5}});

    return(
        <div className="p-[var(--page-margin)] bg-inherit">
            <div className="flex flex-col items-center">
                {loading && <p className="text-larger1">LOADING</p>}
                {!loading && data?.searchShopsByName.items.map((repairShop, repairShopIndex) => (
                    <RepairShopCard repairShop={repairShop} key={repairShopIndex}/>
                ))}
            </div>
        </div>
    )
}