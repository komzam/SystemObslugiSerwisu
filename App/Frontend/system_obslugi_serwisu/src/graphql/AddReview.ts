import {gql} from "@apollo/client";

export const ADD_REVIEW = gql`
    mutation AddReview($repairShopId: String!, $rating: Int!, $comment: String) {
        addReview(request:  {
            repairShopId: $repairShopId,
            rating: $rating,
            comment: $comment
        })
    }
`