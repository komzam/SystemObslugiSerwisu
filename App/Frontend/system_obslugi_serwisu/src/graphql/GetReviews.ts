import {gql} from "@apollo/client";

export const GET_REVIEWS = gql`
    query Reviews($repairShopId: String!, $pageNumber: Int!, $pageSize: Int!) {
    reviews(request:  {
       repairShopId: $repairShopId,
       pageNumber: $pageNumber,
       pageSize: $pageSize
    }){
      items{
        id,
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