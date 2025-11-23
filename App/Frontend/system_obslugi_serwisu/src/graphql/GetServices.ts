import {gql} from "@apollo/client";

export const GET_SERVICES = gql`
    query Services($repairShopId: UUID!, $pageNumber: Int!, $pageSize: Int!) {
    services(request:  {
        repairShopId: $repairShopId,
        pageNumber: $pageNumber,
        pageSize: $pageSize
    }){
        items{
            name,
            price
        },
        pageNumber,
        totalCount,
        totalPages
    }
}
`