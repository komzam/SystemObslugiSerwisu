import {gql} from "@apollo/client";

export const REPORT_COMPLAINT = gql`
    mutation ReportComplaint($repairId: UUID!) {
        repairActions{
            reportComplaint(repairId: $repairId)
        }
    }
`