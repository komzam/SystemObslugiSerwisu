import {gql} from "@apollo/client";

export const GET_REPAIR_NOTES = gql`
    query GetRepairNotes($repairId: UUID!) {
        repairNotes(repairId: $repairId) {
            id,
            worker {
                id,
                firstName,
                lastName
            },
            content,
            createdAt
        }
    }
`