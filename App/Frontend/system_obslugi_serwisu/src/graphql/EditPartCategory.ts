import {gql} from "@apollo/client";

export const EDIT_PART_CATEGORY = gql`
    mutation EditPartCategory($partCategoryId: UUID!, $name: String!) {
        editPartCategory(partCategoryId: $partCategoryId, name: $name)
    }
`