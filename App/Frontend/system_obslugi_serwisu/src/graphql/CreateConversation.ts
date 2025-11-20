import {gql} from "@apollo/client";

export const CREATE_CONVERSATION = gql`
    mutation CreateConversation($receiverId: UUID!, $firstMessage: String!, $actingRole: ActingRole!){
        createConversation(request:  {
            receiverId: $receiverId,
            firstMessage: $firstMessage,
            actingRole: $actingRole
        }){
            id
        }
    }
`