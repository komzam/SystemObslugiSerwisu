import {gql} from '@apollo/client';
import {AuthInfo} from "@/app/Utils/AuthContext";

export const SEARCH = gql`
    query Search($name: String!, $pageNumber: Int!, $pageSize: Int!) {
        searchShopsByName(request:  {
            name: $name,
            pageNumber: $pageNumber,
            pageSize: $pageSize
        })
        {
            items{
                id,
                name,
                address{
                    street,
                    buildingNumber,
                    apartmentNumber,
                    postalCode,
                    city
                }
            },
            pageNumber,
            totalCount,
            totalPages
        }
    }
`


export type SearchRepairShop = {
    id: string;
    name: string;
    address:{
        street: string;
        buildingNumber: string;
        apartmentNumber?: string;
        postalCode: string;
        city: string;
    }
}

export interface SearchQuery{
    searchShopsByName:{
        items: SearchRepairShop[];
        pageNumber: number;
        totalCount: number;
        totalPages: number;
    }
}