import {gql} from "@apollo/client";

export const DECLARE_UNFIXABLE = gql`
    mutation DeclareUnfixable($repairId: UUID!, $description: String) {
        repairActions{
            declareUnfixable(request:{
                repairId: $repairId,
                description: $description
            })
        }
    }
`