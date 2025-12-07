import {useTranslations} from "next-intl";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";
import {useToast} from "@/components/Utils/ToastNotifications";
import {useMutation} from "@apollo/client/react";
import {
    StartRepairMutation,
    StartRepairMutationVariables
} from "@/__generated__/types";
import {ErrorName} from "@/components/Utils/ErrorName";
import {START_REPAIR} from "@/graphql/RepairActions/StartRepair";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

export function AwaitingRepair({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.AwaitingRepair");
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const [startRepair] = useMutation<StartRepairMutation, StartRepairMutationVariables>(START_REPAIR);
    const onStartRepair = async () => {
        try {
            await startRepair({variables:{repairId}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    return (
        <ActionRoot>
            <ActionMessage>{t("message")}</ActionMessage>
            <Button onClick={onStartRepair}>{t("startRepair")}</Button>
        </ActionRoot>
    );
}