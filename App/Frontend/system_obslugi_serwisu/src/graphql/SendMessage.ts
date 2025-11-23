import {gql} from "@apollo/client";

export const SEND_MESSAGE = gql`
    mutation SendMessage($conversationId: UUID!, $message: String!) {
        sendMessage(request: {
            conversationId: $conversationId,
            message: $message
        })
    }
`