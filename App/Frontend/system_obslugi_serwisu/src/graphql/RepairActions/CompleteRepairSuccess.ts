import {gql} from "@apollo/client";

export const COMPLETE_REPAIR_SUCCESS = gql`
    mutation CompleteRepairSuccess($repairId: UUID!, $finalCostCurrency: CurrencyCode, $finalCost: Decimal, $description: String) {
        repairActions{
            completeRepairSuccess(request:{
                repairId: $repairId,
                finalCostCurrency: $finalCostCurrency,
                finalCost: $finalCost,
                description: $description
            })
        }
    }
`