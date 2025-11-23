import {gql} from "@apollo/client";

export const GET_REVIEWS = gql`
    query Reviews($repairShopId: UUID!, $pageNumber: Int!, $pageSize: Int!) {
    reviews(request:  {
       repairShopId: $repairShopId,
       pageNumber: $pageNumber,
       pageSize: $pageSize
    }){
      items{
        id,
        author{
          name  
        },
        rating,
        comment,
      },
      pageNumber,
      totalCount,
      totalPages
    }
}
`