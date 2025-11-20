import {gql} from "@apollo/client";

export const CONVERSATION_EXISTS = gql`
    query ConversationExists($repairShopId: UUID!, $customerId: UUID!, $actingRole: ActingRole!){
        conversationByParticipants(request:  {
            repairShopId: $repairShopId,
            customerId: $customerId,
            actingRole: $actingRole
        }){
            id
        }
    }
`