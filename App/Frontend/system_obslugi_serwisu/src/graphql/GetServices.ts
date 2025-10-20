import {gql} from "@apollo/client";

export const GET_SERVICES = gql`
query Services($repairShopId: String!, $pageNumber: Int!, $pageSize: Int!) {
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

export type GetService = {
    name: string,
    price: string
}

export type GetServices = {
    items: GetService[];
    pageNumber: number;
    totalCount: number;
    totalPages: number;
}

export interface GetServicesQuery{
    services: GetServices;
}