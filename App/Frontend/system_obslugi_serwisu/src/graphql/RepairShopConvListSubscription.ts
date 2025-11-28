import {gql} from "@apollo/client";

export const REPAIRSHOP_CONV_LIST_SUB = gql`
    subscription RepairShopConvListSubscription($repairShopId: UUID!){
        onRepairShopConversationsUpdated(repairShopId: $repairShopId){
            id,
            modifiedAt
            messages(request: {numberOfMessages: 1}){
                items {
                    id,
                    content,
                    createdAt,
                    senderRole
                }
            }
        }
    }
`