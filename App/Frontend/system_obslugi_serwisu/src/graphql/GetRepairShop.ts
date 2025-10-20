import {gql} from '@apollo/client';
import {OpeningHours} from "@/app/Types/OpeningHours";

export const GET_REPAIRSHOP = gql`
    query GetRepairShop($id: String!) {
        repairShop(request:{ id: $id })
        {
            id,
            name,
            email,
            phone,
            timeZoneId,
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

export type GetRepairShop = {
    id: string;
    name: string;
    email: string;
    phone: string;
    timeZoneId: string;
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
    openingHours:OpeningHours;
}

export interface GetRepairShopQuery{
    repairShop: GetRepairShop;
}