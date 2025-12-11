import {gql} from "@apollo/client";

export const GET_PART_RESERVATIONS = gql`
    query GetPartReservations($partId: UUID!, $pageNumber: Int!, $pageSize: Int!) {
        partReservations(partId: $partId, pageNumber: $pageNumber, pageSize: $pageSize){
            items {
                id,
                partId,
                repair{
                  id,
                  ticketNumber,
                  deviceInfo {
                    manufacturer,
                    model
                  }
                },
                quantityRequested,
                quantityReserved,
                status
            },
            pageNumber,
            pageSize,
            totalCount,
            totalPages
        }
    }
`