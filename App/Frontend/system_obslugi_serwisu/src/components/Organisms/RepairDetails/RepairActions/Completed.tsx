import {useTranslations} from "next-intl";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";
import {useMutation} from "@apollo/client/react";
import {useToast} from "@/components/Utils/ToastNotifications";
import {ReportComplaintMutation, ReportComplaintMutationVariables} from "@/__generated__/types";
import {REPORT_COMPLAINT} from "@/graphql/RepairActions/ReportComplaint";
import {ErrorName} from "@/components/Utils/ErrorName";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

export function Completed({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.Completed");
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const [reportComplaint] = useMutation<ReportComplaintMutation, ReportComplaintMutationVariables>(REPORT_COMPLAINT);
    const onReportComplaint = async () => {
        try {
            await reportComplaint({variables:{repairId}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }
    return (
        <ActionRoot>
            <ActionMessage type="info">{t("message")}</ActionMessage>
            {/*<Button onClick={onReportComplaint}>{t("startComplaint")}</Button>*/}
        </ActionRoot>
    );
}