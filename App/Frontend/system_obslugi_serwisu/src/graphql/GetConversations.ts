import {gql} from "@apollo/client";

export const GET_CONVERSATIONS = gql`
    query GetConversations($numberOfConversations: Int!, $lastConversationId: UUID) {
        me{
            ... on FullCustomerDto{
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

            ... on FullWorkerDto{
                id,
                repairShop{
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
        }
    }
`