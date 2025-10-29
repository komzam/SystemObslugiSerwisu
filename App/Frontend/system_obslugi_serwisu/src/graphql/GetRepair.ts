import {gql} from "@apollo/client";

export const GET_REPAIR = gql`
    query GetRepair($repairId: String!) {
        repair(request:{repairId: $repairId}) {
            id,
            repairShop{
                id,
                name
            },
            status,
            deviceInfo {
                deviceType,
                manufacturer,
                model,
                serialNumber
            },
            faultInfo {
                whenOccurred,
                howToReproduce,
                description,
                previouslyRepaired
            },
            additionalComment
        }
    }
`