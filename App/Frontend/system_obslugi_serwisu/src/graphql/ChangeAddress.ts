import {gql} from "@apollo/client";

export const CHANGE_ADDRESS = gql`
    mutation ChangeAddress($request: ChangeAddressRequestInput!) {
        changeAddress(request: $request)
    }
`