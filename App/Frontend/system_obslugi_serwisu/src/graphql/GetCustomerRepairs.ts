import {gql} from "@apollo/client";

export const GET_CUSTOMER_REPAIRS = gql`
    query GetCustomerRepairs($pageNumber: Int!, $pageSize: Int!) {
        me{
            __typename,
            ... on FullCustomerDto{
                id,
                repairs(request:  {
                    pageNumber: $pageNumber,
                    pageSize: $pageSize
                }){
                    items{
                        id
                        ticketNumber,
                        deviceInfo {
                            manufacturer,
                            model
                        },
                        faultInfo{
                            description
                        }
                        status
                    }
                    pageNumber,
                    pageSize,
                    totalCount,
                    totalPages
                }
            }
        }
    }
`