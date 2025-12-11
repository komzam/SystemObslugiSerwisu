import {gql} from "@apollo/client";

export const GET_PARTS = gql`
    query GetParts($pageNumber: Int!, $pageSize: Int!, $filter: PartFilterInput!){
        parts(pageNumber: $pageNumber, pageSize: $pageSize, filter:$filter){
            items {
                id
                name,
                category{
                    id,
                    name
                },
                stock,
                stockLevel,
                price
            },
            pageNumber,
            pageSize,
            totalCount,
            totalPages
        }
    }
`