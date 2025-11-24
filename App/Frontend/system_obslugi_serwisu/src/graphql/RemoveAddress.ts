import {gql} from "@apollo/client";

export const REMOVE_ADDRESS = gql`
    mutation RemoveAddress{
        removeAddress
    }
`