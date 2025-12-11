import {gql} from "@apollo/client";

export const CHANGE_REORDER_FLAG = gql`
    mutation ChangeReorderFlag($partId: UUID!){
        changeReorderFlag(partId: $partId)
    }
`