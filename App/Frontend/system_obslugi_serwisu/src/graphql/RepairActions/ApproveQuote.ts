import {gql} from "@apollo/client";

export const APPROVE_QUOTE = gql`
    mutation ApproveQuote($repairId: UUID!) {
        repairActions{
            approveQuote(repairId: $repairId)
        }
    }
`