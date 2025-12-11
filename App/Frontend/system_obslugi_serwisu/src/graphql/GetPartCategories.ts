import {gql} from "@apollo/client";

export const GET_PART_CATEGORIES = gql`
    query GetPartCategories{
        partCategories {
            id,
            name
        }
    }
`