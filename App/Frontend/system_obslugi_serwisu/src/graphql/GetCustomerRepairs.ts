import {gql} from "@apollo/client";

export const GET_CUSTOMER_REPAIRS = gql`
    query GetCustomerRepairs($pageNumber: Int!, $pageSize: Int!) {
        me{
            id,
            repairs(request:  {
                pageNumber: $pageNumber,
                pageSize: $pageSize
            }){
                items{
                    id
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
`