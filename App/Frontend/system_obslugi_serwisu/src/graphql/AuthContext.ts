import {gql} from "@apollo/client";
import {AuthInfo} from "@/app/Utils/AuthContext";

export const AUTH_CONTEXT_QUERY = gql`
    query Me {
        me {
           email,
           name,
           isBusiness
        }
    }
`

export interface AuthContextQuery{
    me: AuthInfo
}