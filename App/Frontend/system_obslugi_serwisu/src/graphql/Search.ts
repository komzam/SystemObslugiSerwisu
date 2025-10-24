import {gql} from '@apollo/client';

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