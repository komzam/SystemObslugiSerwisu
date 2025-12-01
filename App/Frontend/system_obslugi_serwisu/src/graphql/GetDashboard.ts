import {gql} from "@apollo/client";

export const GET_DASHBOARD = gql`
    query GetDashboard($repairShopId: UUID!){
        awaitingDiagnosis: repairCount(repairShopId: $repairShopId, repairStatus: AWAITING_DIAGNOSIS)
        awaitingRepair: repairCount(repairShopId: $repairShopId, repairStatus: AWAITING_REPAIR)
        awaitingShipping: repairCount(repairShopId: $repairShopId, repairStatus: AWAITING_SHIPPING)
        readyForPickup: repairCount(repairShopId: $repairShopId, repairStatus: READY_FOR_PICKUP)
        complaint: repairCount(repairShopId: $repairShopId, repairStatus: COMPLAINT)
        
        conversations: repairShop(request: {repairShopId: $repairShopId}){
            conversations(request: {numberOfConversations: 3}){
                items {
                    id,
                    conversationType,
                    repair {
                        id,
                        deviceInfo{
                            model,
                            manufacturer
                        }
                    },
                    customer{
                        id,
                        name
                    },
                    messages(request: {numberOfMessages: 1}){
                        items{
                            id,
                            content,
                            createdAt
                        }
                    }
                }
            }
        }
    }
`