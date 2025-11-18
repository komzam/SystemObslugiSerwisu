import {gql} from "@apollo/client";

export const GET_CUSTOMER_CONVERSATIONS = gql`
    query GetCustomerConversations($numberOfConversations: Int!, $lastConversationId: UUID) {
        me{
            id,
            conversations(request:  {
                numberOfConversations: $numberOfConversations,
                lastConversationId: $lastConversationId
            }){
                items{
                    id,
                    conversationType,
                    createdAt,
                    modifiedAt,
                    repairShop{
                        id,
                        name
                    },
                    repair{
                        deviceInfo {
                            manufacturer
                            model
                        }
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
                },
                hasMore,
                lastItemId
            }
        }
    }
`