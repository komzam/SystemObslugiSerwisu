import {gql} from "@apollo/client";

export const START_DIAGNOSIS = gql`
    mutation StartDiagnosis($repairId: UUID!) {
        repairActions{
            startDiagnosis(repairId: $repairId)
        }
    }
`