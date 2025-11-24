import {gql} from "@apollo/client";

export const GET_REPAIR = gql`
    query GetRepair($repairId: UUID!) {
        repair(request:{repairId: $repairId}) {
            id,
            ticketNumber,
            conversationId,
            repairShop{
                id,
                name,
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
            additionalComment,
            images{
              id,
                small,
                medium,
                large,
                extraLarge
            },
            repairHistory{
                id,
                status,
                createdAt,
                description,
                ... on PaymentRepairStepDto{
                    amount,
                    paid
                },
                ... on QuoteRepairStepDto{
                    quote {
                        laborCost,
                        partsCost,
                        totalCost,
                        quoteAccepted   
                    }
                }
            }
        }
    }
`