import {gql} from "@apollo/client";

export const CHANGE_PREFERRED_CONTACT = gql`
    mutation ChangePreferredContact($contactMethod: ContactMethod) {
        changePreferredContact(contactMethod: $contactMethod)
    }
`