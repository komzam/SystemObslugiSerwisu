"use client"

import {RepairListRepair, RSRepairList} from "@/components/Organisms/RSRepairList";
import {GetRepairShopRepairsQuery, GetRepairShopRepairsQueryVariables, RepairStatus} from "@/__generated__/types";
import {useQuery} from "@apollo/client/react";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {useState} from "react";
import {GET_REPAIRSHOP_REPAIRS} from "@/graphql/GetRepairShopRepairs";

export default function RepairsPage(){
    const authContext = useAuthContext();
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const { data: queryData, loading: queryLoading } = useQuery<GetRepairShopRepairsQuery, GetRepairShopRepairsQueryVariables>(GET_REPAIRSHOP_REPAIRS,
        {
            variables:
                {
                    repairShopId: authContext.authInfo?.__typename == "FullWorkerDto"? authContext.authInfo.repairShop?.id : null,
                    pageNumber: selectedPage,
                    pageSize: 10
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

    return (
        <div className="min-w-[85rem] max-w-[150rem]">
            <RSRepairList
                repairs={repairs}
                currentPage={selectedPage}
                totalPages={queryData?.repairShop.repairs.totalPages??1}
                onPageChange={(pageNumber) => setSelectedPage(pageNumber)}
            />
        </div>
    );
}