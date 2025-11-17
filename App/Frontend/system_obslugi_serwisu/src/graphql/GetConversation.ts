import {gql} from "@apollo/client";

export const GET_CONVERSATION = gql`
    query GetConversation($conversationId: UUID!, $actingRole: ActingRole!) {
        conversation(request: {
            conversationId: $conversationId,
            actingRole: $actingRole
        }){
          messages(request: {numberOfMessages: 10}){
              items{
                  senderRole,
                  content,
                  createdAt
              },
              lastItemId
          }
        }
    }
`