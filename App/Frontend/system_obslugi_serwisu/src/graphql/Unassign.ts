import {gql} from "@apollo/client";

export const UNASSIGN = gql`
    mutation Unassign($repairId: UUID!){
        unassignWorker(repairId: $repairId)
    }
`;