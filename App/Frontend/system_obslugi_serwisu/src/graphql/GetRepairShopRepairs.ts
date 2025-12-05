import {gql} from "@apollo/client";

export const GET_REPAIRSHOP_REPAIRS = gql`
    query GetRepairShopRepairs(
        $repairShopId: UUID!,
        $pageNumber: Int!,
        $pageSize: Int!,
        $filter: RepairFilterInput!,
        $sortBy: RepairSortField,
        $sortDirection: SortDirection)
    {
        repairShop(request: {repairShopId: $repairShopId}) {
            id,
            repairs(request:  {
                pageNumber: $pageNumber,
                pageSize: $pageSize,
                filter: $filter,
                sortBy: $sortBy,
                sortDirection: $sortDirection
            }){
                items{
                    id
                    ticketNumber,
                    contactInfo{
                        fullName
                    },
                    deviceInfo {
                        manufacturer,
                        model
                    },
                    faultInfo{
                        description
                    },
                    assignedWorker {
                        firstName,
                        lastName,
                    }
                    status,
                    createdAt
                }
                pageNumber,
                pageSize,
                totalCount,
                totalPages
            }
        }
    }
`