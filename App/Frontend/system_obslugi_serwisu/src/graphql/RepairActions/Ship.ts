import {gql} from "@apollo/client";

export const SHIP = gql`
    mutation Ship($repairId: UUID!) {
        repairActions{
            ship(repairId:$repairId)
        }
    }
`