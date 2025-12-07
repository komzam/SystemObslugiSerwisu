import {gql} from "@apollo/client";

export const FINALIZE_DELIVERY = gql`
    mutation FinalizeDelivery($repairId: UUID!) {
        repairActions{
            finalizeDelivery(repairId: $repairId)
        }
    }
`