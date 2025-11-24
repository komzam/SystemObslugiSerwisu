import {gql} from "@apollo/client";

export const REMOVE_PHONE_NUMBER = gql`
    mutation RemovePhoneNumber{
        removePhoneNumber
    }
`