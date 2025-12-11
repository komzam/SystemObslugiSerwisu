"use client"

import {RepairListRepair, RSRepairList} from "@/components/Organisms/RSRepairList";
import {
    GetRepairShopRepairsQuery,
    GetRepairShopRepairsQueryVariables,
    RepairFilterInput, RepairStatus
} from "@/__generated__/types";
import {useQuery} from "@apollo/client/react";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {useEffect, useState} from "react";
import {GET_REPAIRSHOP_REPAIRS} from "@/graphql/GetRepairShopRepairs";
import {useRouter, usePathname} from "@/i18n/navigation";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";

export default function RepairsPage(){
    const authContext = useAuthContext();
    const router = useRouter();
    const queryParams = useSearchParams();
    const pathname = usePathname();
    const {page:queryPage, filter:queryFilter} = loadQueryParams(queryParams);
    const [selectedPage, setSelectedPage] = useState<number>(queryPage??1);
    const [filter, setFilter] = useState<RepairFilterInput>(queryFilter ?? {});

    const { data: queryData, loading: queryLoading } = useQuery<GetRepairShopRepairsQuery, GetRepairShopRepairsQueryVariables>(GET_REPAIRSHOP_REPAIRS,
        {
            variables:
                {
                    repairShopId: authContext.authInfo?.__typename == "FullWorkerDto"? authContext.authInfo.repairShop?.id : null,
                    pageNumber: selectedPage,
                    pageSize: 10,
                    filter: filter,
                }
        }
    );

    const repairs:RepairListRepair[] = [];
    for(const repair of queryData?.repairShop.repairs.items??[]){
        repairs.push({
            id: repair.id,
            ticketNumber: repair.ticketNumber,
            customer: {
                name: repair.contactInfo.fullName
            },
            deviceInfo:{
                manufacturer: repair.deviceInfo.manufacturer,
                model: repair.deviceInfo.model
            },
            status: repair.status,
            technician: repair.assignedWorker != null ? repair.assignedWorker.firstName + " " + repair.assignedWorker.lastName : undefined,
            createdAt: new Date(Date.parse(repair.createdAt))
        });
    }

    const onFilterChange = (value: RepairFilterInput) => {
        setFilter(value);
        setSelectedPage(1);
    }

    useEffect(()=>{
        router.push(
            {
                pathname: pathname,
                query: createQueryParams(selectedPage, filter)
            }
        );
    }, [selectedPage, filter]);

    return (
        <div className="min-w-240 max-w-600">
            <RSRepairList
                repairs={repairs}
                currentPage={selectedPage}
                totalPages={queryData?.repairShop.repairs.totalPages??1}
                onPageChange={(pageNumber) => setSelectedPage(pageNumber)}
                filter={filter}
                onFilterChange={onFilterChange}
                isLoading={queryLoading}
            />
        </div>
    );
}

const createQueryParams = (pageNumber: number, filter: RepairFilterInput) => {
    return {
        page: pageNumber,
        ...(filter.searchTerm && { search: filter.searchTerm}),
        ...(filter.statuses && { status: filter.statuses.join(",") })
    };
};

const loadQueryParams = (params:ReadonlyURLSearchParams) => {
    const queryParams = Object.fromEntries(params.entries());
    const page = Number(queryParams.page) || 1;
    const statuses = queryParams.status? queryParams.status.split(",") : null;
    const searchTerm = queryParams?.search;
    const filter: RepairFilterInput = {
        statuses: statuses as RepairStatus[],
        searchTerm: searchTerm,
    }
    return {page: page, filter: filter};
};