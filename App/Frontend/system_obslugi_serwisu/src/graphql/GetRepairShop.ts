import {gql} from '@apollo/client';
import {AuthInfo} from "@/app/Utils/AuthContext";

export const GET_REPAIRSHOP = gql`
    query GetRepairShop($id: String!) {
        repairShop(request:{ id: $id })
        {
            id,
            name,
            email,
            phone,
            rating,
            reviewCount,
            aboutUs,
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
        }
    }
`

type OpeningInterval = {
    from: string;
    to: string;
} | null;

export type GetRepairShop = {
    id: string;
    name: string;
    email: string;
    phone: string;
    rating: number;
    reviewCount: number;
    aboutUs?: string;
    address:{
        street: string;
        buildingNumber: string;
        apartmentNumber?: string;
        postalCode: string;
        city: string;
    };
    openingHours:{
        monday: OpeningInterval;
        tuesday: OpeningInterval;
        wednesday: OpeningInterval;
        thursday: OpeningInterval;
        friday: OpeningInterval;
        saturday: OpeningInterval;
        sunday: OpeningInterval;
    }
}

export interface GetRepairShopQuery{
    repairShop: GetRepairShop;
}