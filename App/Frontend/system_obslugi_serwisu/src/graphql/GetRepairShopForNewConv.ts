import {gql} from "@apollo/client";

export const GET_REPAIRSHOP_FOR_NEW_CONV = gql`
    query GetRepairShopForNewConv($id: String!) {
        repairShop(request:{ id: $id })
        {
            id,
            name,
            rating,
            reviewCount
        }
    }
`