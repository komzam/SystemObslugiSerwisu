import {gql} from "@apollo/client";

export const REJECT_QUOTE = gql`
    mutation RejectQuote($repairId: UUID!, $actingRole: ActingRole!) {
        repairActions{
            rejectQuote(request:{
                repairId: $repairId,
                actingRole: $actingRole
            })
        }
    }
`