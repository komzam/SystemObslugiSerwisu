import {gql} from "@apollo/client";

export const ADD_PART = gql`
    mutation AddPart($request: AddPartRequestInput!) {
        addPart(
            request: $request
        )
    }
`