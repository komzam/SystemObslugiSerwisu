import {gql} from "@apollo/client";

export const CONVERSATION_SUBSCRIPTION = gql`
    subscription ConversationSubscription($conversationId: UUID!, $actingRole: ActingRole!){
        onMessageSent(conversationId: $conversationId, actingRole: $actingRole){
            senderRole,
            content,
            createdAt
        }
    }
`