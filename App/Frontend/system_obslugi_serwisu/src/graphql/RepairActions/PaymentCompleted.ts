import {gql} from "@apollo/client";

export const PAYMENT_COMPLETED = gql`
    mutation PaymentCompleted($repairId: UUID!) {
        repairActions{
            paymentCompleted(repairId:$repairId)
        }
    }
`