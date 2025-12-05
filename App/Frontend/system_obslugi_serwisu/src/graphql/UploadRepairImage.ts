import {gql} from "@apollo/client";

export const UPLOAD_REPAIR_IMAGE = gql`
    mutation UploadRepairImage($repairId: UUID!, $contentType: String!) {
        uploadRepairImage: addRepairImage(repairId: $repairId, contentType: $contentType)
    }
`