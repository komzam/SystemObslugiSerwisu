import {gql} from "@apollo/client";

export const ADD_PART_CATEGORY = gql`
    mutation AddPartCategory($name: String!) {
        addPartCategory(name: $name)
    }
`