import {gql} from '@apollo/client';

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login( request: {email: $email, password: $password, rememberMe: true} )
    }
`