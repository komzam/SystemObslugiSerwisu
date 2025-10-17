import {gql} from "@apollo/client";

export const GET_REVIEWS = gql`
    query Reviews($repairShopId: String!, $pageNumber: Int!, $pageSize: Int!) {
    reviews(request:  {
       repairShopId: $repairShopId,
       pageNumber: $pageNumber,
       pageSize: $pageSize
    }){
      items{
        authorName,
        rating,
        comment,
      },
      pageNumber,
      totalCount,
      totalPages
    }
}
`

export type GetReview = {
    authorName: string;
    rating: number;
    comment?: string;
}

export type GetReviews = {
    items: GetReview[];
    pageNumber: number;
    totalCount: number;
    totalPages: number;
}

export interface GetReviewsQuery{
    reviews: GetReviews;
}