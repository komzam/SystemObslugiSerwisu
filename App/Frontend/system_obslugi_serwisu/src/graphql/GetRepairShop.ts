import {gql} from '@apollo/client';

export const GET_REPAIRSHOP = gql`
    query GetRepairShop($repairShopId: UUID!) {
        repairShop(request:{ repairShopId: $repairShopId })
        {
            id,
            mainImage{
                extraLarge
            },
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