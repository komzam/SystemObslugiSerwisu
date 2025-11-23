import {gql} from "@apollo/client";

export const CHANGE_EMAIL = gql`
    mutation ChangeEmail($password: String!, $newEmail: String!) {
        changeEmail(request:  {
            password: $password,
            newEmail: $newEmail
        })
    }
`