import {gql} from "@apollo/client";

export const GET_CONVERSATION = gql`
    query GetConversation($conversationId: UUID!, $actingRole: ActingRole!, $numberOfMessages: Int!, $lastMessageId: UUID) {
        conversation(request: {
            conversationId: $conversationId,
            actingRole: $actingRole
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
    query GetMoreMessages($conversationId: UUID!, $actingRole: ActingRole!, $numberOfMessages: Int!, $lastMessageId: UUID) {
        conversation(request: {
            conversationId: $conversationId,
            actingRole: $actingRole
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