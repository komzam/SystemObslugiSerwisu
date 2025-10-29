"use client"

import {RepairItem, RepairItemProps} from "@/app/Molecules/RepairItem";
import {useQuery} from "@apollo/client/react";
import {GET_CUSTOMER_REPAIRS} from "@/graphql/GetCustomerRepairs";
import {GetCustomerRepairsQuery, GetCustomerRepairsQueryVariables} from "@/__generated__/types";
import {LoadingIcon} from "@/app/Molecules/LoadingIcon";

type Repair = GetCustomerRepairsQuery["me"]["repairs"]["items"][number];

export function RepairsList(){
    const {data, loading, error} = useQuery<GetCustomerRepairsQuery,
        GetCustomerRepairsQueryVariables>(GET_CUSTOMER_REPAIRS, {variables:{
            pageNumber: 1,
            pageSize: 5,
        }});

    if(loading) return <LoadingIcon/>
    if(error) return <p>ERROR</p>
    if(!data) return <p>ERROR</p>

    const repairs = data.me.repairs.items;

    return (
        <div className="flex flex-col gap-5 w-full">
            {repairs.map((repair: Repair, repairNumber:number) => (
                <RepairItem key={repairNumber} repair={repair}/>
            ))}
        </div>
    )
}