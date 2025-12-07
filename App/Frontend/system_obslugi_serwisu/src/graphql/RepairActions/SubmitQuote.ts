import {gql} from "@apollo/client";

export const SUBMIT_QUOTE = gql`
    mutation SubmitQuote($repairId: UUID!, $currency: CurrencyCode!, $laborCost: Decimal!, $partsCost: Decimal!, $description: String) {
        repairActions{
            submitQuote(request:{
                repairId: $repairId,
                currency: $currency,
                laborCost: $laborCost,
                partsCost: $partsCost,
                description: $description
            })
        }
    }
`