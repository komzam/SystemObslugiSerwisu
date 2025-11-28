"use client"

import {RepairItem} from "@/components/Molecules/RepairItem";
import {useQuery} from "@apollo/client/react";
import {GET_CUSTOMER_REPAIRS} from "@/graphql/GetCustomerRepairs";
import {GetCustomerRepairsQuery, GetCustomerRepairsQueryVariables} from "@/__generated__/types";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {PageSelector} from "@/components/Molecules/PageSelector";
import {useState} from "react";

type Customer = Extract<GetCustomerRepairsQuery["me"], { __typename: "FullCustomerDto" }>;
type Repair = Customer["repairs"]["items"][number];

export function RepairsList(){
    const [currentPage, setCurrentPage] = useState<number>(1)
    const {data, loading, error} = useQuery<GetCustomerRepairsQuery,
        GetCustomerRepairsQueryVariables>(GET_CUSTOMER_REPAIRS, {variables:{
            pageNumber: currentPage,
            pageSize: 5,
        }});

    if(loading) return <LoadingIcon/>
    if(error) return <p>ERROR</p>
    if(!data) return <p>ERROR</p>
    if(data.me.__typename != "FullCustomerDto") return null; // Temp fix

    const repairs = data.me.repairs.items;

    return (
        <>
            <div className="flex flex-col gap-5 w-full">
                {repairs.map((repair: Repair, repairNumber:number) => (
                    <RepairItem key={repairNumber} repair={repair}/>
                ))}
            </div>
            <PageSelector totalPages={data.me.repairs.totalPages} currentPage={currentPage} onPageChange={(page)=>setCurrentPage(page)}/>
        </>
    )
}