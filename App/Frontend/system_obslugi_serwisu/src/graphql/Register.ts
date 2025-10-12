import {gql} from '@apollo/client';

export const REGISTER = gql`
    mutation Register($email: String!, $password: String!, $isBusiness: Boolean!, $firstName: String, $lastName: String, $companyName: String, $taxIdNumber: String) {
        register( request: {
            email: $email,
            password: $password,
            isBusiness: $isBusiness,
            firstName: $firstName,
            lastName: $lastName,
            companyName: $companyName,
            taxIdNumber: $taxIdNumber
        })
    }
`