import {gql} from "@apollo/client";

export const GET_CUSTOMER_CONVERSATIONS = gql`
    query GetCustomerConversations($numberOfConversations: Int!, $lastConversationId: UUID) {
        me{
            conversations(request:  {
                numberOfConversations: $numberOfConversations,
                lastConversationId: $lastConversationId
            }){
                items{
                    id,
                    createdAt,
                    modifiedAt,
                    repairShop{
                        name
                    },
                    messages(request:  {
                        numberOfMessages: 1
                    }){
                        items{
                            id,
                            senderRole,
                            content,
                            createdAt
                        }
                    }
                }
            }
        }
    }
`