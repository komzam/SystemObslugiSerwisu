"use client"

import {RepairShopCard} from "@/components/Organisms/RepairShopCard";
import {SEARCH} from "@/graphql/Search";
import {useQuery} from "@apollo/client/react";
import {useSearchParams} from "next/navigation";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {SearchQuery, SearchQueryVariables} from "@/__generated__/types";

type SearchParams = {
    searchParams: {
        name?: string,
        address?: string,
        page: number
    };
}

export default function Search() {
    const searchParams = useSearchParams();
    const { loading, error, data } = useQuery<SearchQuery, SearchQueryVariables>(SEARCH,
    {
        variables:
            {
                name: searchParams.get("name")??"",
                pageNumber:Number(searchParams.get("page"))??1,
                pageSize: 5
            },
        errorPolicy: "all"
    });

    if(loading) return <LoadingIcon/>;

    return(
        <div className="bg-inherit">
            <div className="flex flex-col items-center gap-5">
                {data?.searchShopsByName.items.map((repairShop, repairShopIndex) => (
                    <RepairShopCard repairShop={repairShop} key={repairShopIndex} imagePriority={repairShopIndex < 3}/>
                ))}
            </div>
        </div>
    )
}