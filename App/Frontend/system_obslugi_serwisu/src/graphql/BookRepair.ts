import {gql} from "@apollo/client";

export const BOOK_REPAIR_QUERY = gql`
    mutation BookRepair($request: BookRepairRequestInput!){
        bookRepair(request: $request){
            id
            repairShop{
                address{
                    recipientName,
                    street,
                    buildingNumber,
                    apartmentNumber,
                    postalCode,
                    city,
                    country
                }
            }
            createdAt
        }
    }
`