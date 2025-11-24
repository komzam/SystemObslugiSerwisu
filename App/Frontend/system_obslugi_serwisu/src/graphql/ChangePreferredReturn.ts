import {gql} from "@apollo/client";

export const CHANGE_PREFERRED_RETURN = gql`
    mutation ChangePreferredReturn($returnMethod: ReturnMethod) {
        changePreferredReturn(returnMethod: $returnMethod)
    }
`