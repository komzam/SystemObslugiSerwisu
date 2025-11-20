import {gql} from "@apollo/client";

export const CUSTOMER_CONV_LIST_SUB = gql`
    subscription CustomerConvListSubscription{
        onCustomerConversationsUpdated {
            id,
            modifiedAt
            messages(request: {numberOfMessages: 1}){
                items {
                    id,
                    content,
                    createdAt,
                    senderRole
                }
            }
        }
    }
`