import {gql} from "@apollo/client";

export const AUTH_CONTEXT_QUERY = gql`
    query AuthContext {
        me {
            id,
            email,
            name,
            phone,
            phoneRegionCode,
            preferredContactMethod,
            preferredReturnMethod,
            address {
                recipientName,
                street,
                buildingNumber,
                apartmentNumber,
                postalCode,
                city,
                country
            }
            isBusiness
        }
    }
`