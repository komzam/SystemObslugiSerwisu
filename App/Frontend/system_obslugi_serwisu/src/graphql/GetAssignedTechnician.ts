import {gql} from "@apollo/client";

export const GET_ASSIGNED_TECHNICIAN = gql`
    query GetAssignedTechnician($repairId: UUID!){
        repair(request: {repairId: $repairId}){
            id,
            assignedWorker{
                id,
                firstName,
                lastName
            }
        }
    }
`