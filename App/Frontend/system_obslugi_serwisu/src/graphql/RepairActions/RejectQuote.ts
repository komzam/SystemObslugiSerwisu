import {gql} from "@apollo/client";

export const REJECT_QUOTE = gql`
    mutation RejectQuote($repairId: UUID!) {
        repairActions{
            rejectQuote(repairId: $repairId)
        }
    }
`