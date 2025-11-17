import {gql} from "@apollo/client";

export const SEND_MESSAGE = gql`
    mutation SendMessage($conversationId: UUID!, $actingRole: ActingRole!, $message: String!) {
        sendMessage(request: {
            conversationId: $conversationId,
            actingRole: $actingRole,
            message: $message
        })
    }
`