import {gql} from "@apollo/client";

export const GET_REPAIR_IMAGES = gql`
    query GetRepairImages($repairId: UUID!) {
        repair(request:{repairId: $repairId}) {
            id,
            images{
                id,
                small,
                medium,
                large,
                extraLarge
            }
        }
    }
`