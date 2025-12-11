import {gql} from "@apollo/client";

export const GET_PART = gql`
    query GetPart($partId: UUID!){
        part(partId: $partId){
            id
            name,
            manufacturerCode,
            needsReorder,
            category{
                id,
                name
            },
            stock,
            stockLevel,
            lowStockThreshold,
            price
        }
    }
`