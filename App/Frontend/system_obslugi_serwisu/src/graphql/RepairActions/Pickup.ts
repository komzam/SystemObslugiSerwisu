import {gql} from "@apollo/client";

export const PICKUP = gql`
    mutation Pickup($repairId: UUID!) {
        repairActions{
            pickup(repairId:$repairId)
        }
    }
`