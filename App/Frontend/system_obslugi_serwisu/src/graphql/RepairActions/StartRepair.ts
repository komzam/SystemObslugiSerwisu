import {gql} from "@apollo/client";

export const START_REPAIR = gql`
    mutation StartRepair($repairId: UUID!) {
        repairActions{
            startRepair(repairId: $repairId)
        }
    }
`