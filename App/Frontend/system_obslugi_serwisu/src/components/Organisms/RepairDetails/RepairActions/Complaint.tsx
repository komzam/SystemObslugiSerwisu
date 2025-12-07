import {useTranslations} from "next-intl";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";
import {useToast} from "@/components/Utils/ToastNotifications";
import {ResolveComplaintMutation, ResolveComplaintMutationVariables} from "@/__generated__/types";
import {RESOLVE_COMPLAINT} from "@/graphql/RepairActions/ResolveComplaint";
import {useMutation} from "@apollo/client/react";
import {ErrorName} from "@/components/Utils/ErrorName";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

export function Complaint({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.Complaint");
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const [resolveComplaint] = useMutation<ResolveComplaintMutation, ResolveComplaintMutationVariables>(RESOLVE_COMPLAINT);
    const onResolveComplaint = async () => {
        try {
            await resolveComplaint({variables:{repairId}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    return (
        <ActionRoot>
            <ActionMessage>{t("message")}</ActionMessage>
            <Button onClick={onResolveComplaint}>{t("closeComplaint")}</Button>
        </ActionRoot>
    );
}
