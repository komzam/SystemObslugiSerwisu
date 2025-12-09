import {gql} from "@apollo/client";

export const DELETE_REPAIR_NOTE = gql`
    mutation DeleteRepairNote($repairNoteId: UUID!) {
        deleteRepairNote(repairNoteId: $repairNoteId)
    }
`