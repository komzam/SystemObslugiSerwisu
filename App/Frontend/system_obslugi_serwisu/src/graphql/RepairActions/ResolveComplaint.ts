import {gql} from "@apollo/client";

export const RESOLVE_COMPLAINT = gql`
    mutation ResolveComplaint($repairId: UUID!) {
        repairActions{
            resolveComplaint(repairId: $repairId)
        }
    }
`