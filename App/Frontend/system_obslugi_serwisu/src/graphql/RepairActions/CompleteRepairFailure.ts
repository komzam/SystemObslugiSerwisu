import {gql} from "@apollo/client";

export const COMPLETE_REPAIR_FAILURE = gql`
    mutation CompleteRepairFailure($repairId: UUID!, $description: String) {
        repairActions{
            completeRepairFailure(request:{
                repairId: $repairId,
                description: $description
            })
        }
    }
`