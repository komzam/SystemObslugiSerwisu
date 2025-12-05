import {gql} from "@apollo/client";

export const DELETE_REPAIR_IMAGE = gql`
    mutation DeleteRepairImage($imageId: UUID!){
        deleteRepairImage(imageId: $imageId)
    }
`