import {gql} from "@apollo/client";

export const GET_REPAIR_HISTORY = gql`
    query GetRepairHistory($repairId: UUID!) {
        repair(request:{repairId: $repairId}) {
            id,
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