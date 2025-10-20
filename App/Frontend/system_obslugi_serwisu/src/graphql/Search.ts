import {gql} from '@apollo/client';
import {AuthInfo} from "@/app/Utils/AuthContext";
import {OpeningHours} from "@/app/Types/OpeningHours";

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
                timeZoneId,
                rating,
                reviewCount,
                address{
                    street,
                    buildingNumber,
                    apartmentNumber,
                    postalCode,
                    city
                },
                openingHours{
                    monday{
                        from,
                        to
                    },
                    tuesday{
                        from,
                        to
                    },
                    wednesday{
                        from,
                        to
                    },
                    thursday{
                        from,
                        to
                    },
                    friday{
                        from,
                        to
                    },
                    saturday{
                        from,
                        to
                    },
                    sunday{
                        from,
                        to
                    }
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
    timeZoneId: string;
    rating: number;
    reviewCount: number;
    address:{
        street: string;
        buildingNumber: string;
        apartmentNumber?: string;
        postalCode: string;
        city: string;
    },
    openingHours:OpeningHours;
}

export interface SearchQuery{
    searchShopsByName:{
        items: SearchRepairShop[];
        pageNumber: number;
        totalCount: number;
        totalPages: number;
    }
}