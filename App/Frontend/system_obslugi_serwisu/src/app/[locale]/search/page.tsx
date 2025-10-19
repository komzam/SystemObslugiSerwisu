﻿"use client"

import {RepairShopCard} from "@/app/Organisms/RepairShopCard";
import {SEARCH, SearchQuery} from "@/graphql/Search";
import {useQuery} from "@apollo/client/react";
import {useSearchParams} from "next/navigation";
import {LoadingIcon} from "@/app/Molecules/LoadingIcon";

type SeachParams = {
    searchParams: {
        name?: string,
        address?: string,
        page: number
    };
}


export default function Search() {
    const searchParams = useSearchParams();
    const { loading, error, data } = useQuery<SearchQuery>(SEARCH, {variables:{name:searchParams.get("name"), pageNumber:Number(searchParams.get("page")), pageSize: 5}});

    if(loading) return <LoadingIcon/>;

    return(
        <div className="bg-inherit">
            <div className="flex flex-col items-center">
                {data?.searchShopsByName.items.map((repairShop, repairShopIndex) => (
                    <RepairShopCard repairShop={repairShop} key={repairShopIndex}/>
                ))}
            </div>
        </div>
    )
}