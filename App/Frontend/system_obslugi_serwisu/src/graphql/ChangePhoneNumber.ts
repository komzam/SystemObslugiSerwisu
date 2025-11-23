import {gql} from "@apollo/client";

export const CHANGE_PHONE_NUMBER = gql`
    mutation ChangePhoneNumber($newPhoneNumber: String!, $regionCode: String!) {
        changePhoneNumber(request:  {
            newPhoneNumber: $newPhoneNumber,
            regionCode: $regionCode
        })
    }
`