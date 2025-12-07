import {useTranslations} from "next-intl";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";
import {useToast} from "@/components/Utils/ToastNotifications";
import {useMutation} from "@apollo/client/react";
import {PartsArrivedMutation, PartsArrivedMutationVariables} from "@/__generated__/types";
import {ErrorName} from "@/components/Utils/ErrorName";
import {PARTS_ARRIVED} from "@/graphql/RepairActions/PartsArrived";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

export function AwaitingParts({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.AwaitingParts");
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const [partsArrived] = useMutation<PartsArrivedMutation, PartsArrivedMutationVariables>(PARTS_ARRIVED);
    const onPartsArrived = async () => {
        try {
            await partsArrived({variables:{repairId}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    return (
        <ActionRoot>
            <ActionMessage>{t("message")}</ActionMessage>
            <Button onClick={onPartsArrived}>{t("partsArrived")}</Button>
        </ActionRoot>
    );
}