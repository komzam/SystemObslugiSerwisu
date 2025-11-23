import {gql} from "@apollo/client";

export const GET_CONVERSATION = gql`
    query GetConversation($conversationId: UUID!, $numberOfMessages: Int!, $lastMessageId: UUID) {
        conversation(request: {
            conversationId: $conversationId
        }){
            messages(request: {numberOfMessages: $numberOfMessages, lastMessageId: $lastMessageId }) {
              items{
                  senderRole,
                  content,
                  createdAt
              },
              lastItemId,
              hasMore
            },
            conversationType,
            repair {
                id,
                status,
                deviceInfo {
                    manufacturer,
                    model
                }
            },
            repairShop{
                id,
                name,
                rating,
                reviewCount
            }
        }
    }
`

export const GET_MORE_MESSAGES = gql`
    query GetMoreMessages($conversationId: UUID!, $numberOfMessages: Int!, $lastMessageId: UUID) {
        conversation(request: {
            conversationId: $conversationId
        }){
          messages(request: {numberOfMessages: $numberOfMessages, lastMessageId: $lastMessageId }) {
              items{
                  senderRole,
                  content,
                  createdAt
              },
              lastItemId,
              hasMore
          }
        }
    }
`