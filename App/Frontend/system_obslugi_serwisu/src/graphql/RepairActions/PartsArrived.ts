import {gql} from "@apollo/client";

export const PARTS_ARRIVED = gql`
    mutation PartsArrived($repairId: UUID!) {
        repairActions{
            partsArrived(repairId: $repairId)
        }
    }
`