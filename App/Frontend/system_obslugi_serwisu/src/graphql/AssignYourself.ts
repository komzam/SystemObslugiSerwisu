import {gql} from "@apollo/client";

export const ASSIGN_YOURSELF = gql`
    mutation AssignYourself($repairId: UUID!){
        assignWorker(repairId: $repairId)
    }
`;