import {gql} from "@apollo/client";

export const DELETE_PART_CATEGORY = gql`
    mutation DeletePartCategory($partCategoryId: UUID!) {
        deletePartCategory(partCategoryId: $partCategoryId)
    }
`