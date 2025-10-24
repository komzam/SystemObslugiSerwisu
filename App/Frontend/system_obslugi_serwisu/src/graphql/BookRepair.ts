import {gql} from "@apollo/client";

export const BOOK_REPAIR_QUERY = gql`
    mutation BookRepair($request: BookRepairRequestInput!){
        bookRepair(request: $request){
            id
            repairShopId
            createdAt
        }
    }
`