import {useTranslations} from "next-intl";
import {useToast} from "@/components/Utils/ToastNotifications";
import {useMutation} from "@apollo/client/react";
import {StartDiagnosisMutation, StartDiagnosisMutationVariables} from "@/__generated__/types";
import {START_DIAGNOSIS} from "@/graphql/RepairActions/StartDiagnosis";
import {ErrorName} from "@/components/Utils/ErrorName";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

export function AwaitingDiagnosis({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.AwaitingDiagnosis");
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const [startDiagnosis] = useMutation<StartDiagnosisMutation, StartDiagnosisMutationVariables>(START_DIAGNOSIS);
    const onStartDiagnosis = async () => {
        try {
            await startDiagnosis({variables:{repairId}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    return (
        <ActionRoot>
            <ActionMessage>{t("message")}</ActionMessage>
            <Button onClick={onStartDiagnosis}>{t("startDiagnosis")}</Button>
        </ActionRoot>
    );
}