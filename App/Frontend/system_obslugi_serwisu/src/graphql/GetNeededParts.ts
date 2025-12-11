import {gql} from "@apollo/client";

export const GET_NEEDED_PARTS = gql`
    query GetNeededParts($repairId: UUID!, $pageNumber: Int!, $pageSize: Int!) {
        partsNeeded(repairId: $repairId, pageNumber: $pageNumber, pageSize: $pageSize){
            items {
                partId,
                part{
                    name,
                    stock,
                    stockLevel,
                    price
                }
            },
            pageNumber,
            pageSize,
            totalCount,
            totalPages
        }
    }
`