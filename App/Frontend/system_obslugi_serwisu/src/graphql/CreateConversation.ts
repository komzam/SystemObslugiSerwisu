import {gql} from "@apollo/client";

export const CREATE_CONVERSATION = gql`
    mutation CreateConversation($receiverId: UUID!, $firstMessage: String!){
        createConversation(request:  {
            receiverId: $receiverId,
            firstMessage: $firstMessage
        }){
            id
        }
    }
`