import {gql} from "@apollo/client";

export const PARTS_NEEDED = gql`
    mutation PartsNeeded($repairId: UUID!) {
        repairActions{
            partsNeeded(repairId: $repairId)
        }
    }
`