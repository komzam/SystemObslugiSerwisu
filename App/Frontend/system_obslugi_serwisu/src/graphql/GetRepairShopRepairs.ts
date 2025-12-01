import {gql} from "@apollo/client";

export const GET_REPAIRSHOP_REPAIRS = gql`
    query GetRepairShopRepairs($repairShopId: UUID!, $pageNumber: Int!, $pageSize: Int!) {
        repairShop(request: {repairShopId: $repairShopId}) {
            id,
            repairs(request:  {
                pageNumber: $pageNumber,
                pageSize: $pageSize
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