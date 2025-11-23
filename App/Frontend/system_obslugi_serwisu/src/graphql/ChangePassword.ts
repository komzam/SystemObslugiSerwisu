import {gql} from "@apollo/client";

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
        changePassword(request:  {
            currentPassword: $currentPassword,
            newPassword: $newPassword
        })
    }
`