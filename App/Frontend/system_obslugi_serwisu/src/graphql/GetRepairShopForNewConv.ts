import {gql} from "@apollo/client";

export const GET_REPAIRSHOP_FOR_NEW_CONV = gql`
    query GetRepairShopForNewConv($repairShopId: UUID!) {
        repairShop(request:{ repairShopId: $repairShopId })
        {
            id,
            name,
            rating,
            reviewCount
        }
    }
`