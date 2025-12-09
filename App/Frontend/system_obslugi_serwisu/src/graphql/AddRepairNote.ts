import {gql} from "@apollo/client";

export const ADD_REPAIR_NOTE = gql`
    mutation AddRepairNote($repairId: UUID!, $content: String!) {
        addRepairNote(request:{repairId: $repairId, content: $content})
    }
`