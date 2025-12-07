import {gql} from "@apollo/client";

export const CHECK_IN_AND_QUEUE = gql`
    mutation CheckInAndQueue($repairId: UUID!, $description: String) {
        repairActions{
            checkInAndQueue(request:{
                repairId: $repairId,
                description: $description
            })
        }
    }
`