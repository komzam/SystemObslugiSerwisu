import {gql} from "@apollo/client";

export const ADJUST_STOCK = gql`
    mutation AdjustStock($partId: UUID!, $newStock: Int!){
        adjustStock(partId: $partId, newStock: $newStock)
    }
`