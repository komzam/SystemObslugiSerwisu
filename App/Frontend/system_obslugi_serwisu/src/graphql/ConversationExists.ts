import {gql} from "@apollo/client";

export const CONVERSATION_EXISTS = gql`
    query ConversationExists($repairShopId: UUID!, $customerId: UUID!){
        conversationByParticipants(request:  {
            repairShopId: $repairShopId,
            customerId: $customerId
        }){
            id
        }
    }
`