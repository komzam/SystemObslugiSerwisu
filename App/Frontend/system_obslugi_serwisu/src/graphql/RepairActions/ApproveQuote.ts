import {gql} from "@apollo/client";

export const APPROVE_QUOTE = gql`
    mutation ApproveQuote($repairId: UUID!, $actingRole: ActingRole!) {
        repairActions{
            approveQuote(request: {
                repairId: $repairId,
                actingRole: $actingRole
            })
        }
    }
`