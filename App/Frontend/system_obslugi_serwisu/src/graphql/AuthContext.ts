import {gql} from "@apollo/client";

export const AUTH_CONTEXT_QUERY = gql`
    query AuthContext {
        me {
           email,
           name,
           isBusiness
        }
    }
`