import {useTranslations} from "next-intl";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";
import {FinalizeDeliveryMutation, FinalizeDeliveryMutationVariables} from "@/__generated__/types";
import {FINALIZE_DELIVERY} from "@/graphql/RepairActions/FinalizeDelivery";
import {useMutation} from "@apollo/client/react";
import {useToast} from "@/components/Utils/ToastNotifications";
import {ErrorName} from "@/components/Utils/ErrorName";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

export function Shipped({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.Shipped");
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const [finalizeDelivery] = useMutation<FinalizeDeliveryMutation, FinalizeDeliveryMutationVariables>(FINALIZE_DELIVERY);
    const onFinalizeDelivery = async () => {
        try {
            await finalizeDelivery({variables:{repairId}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }
    return (
        <ActionRoot>
            <ActionMessage type="info">{t("message")}</ActionMessage>
            <Button onClick={onFinalizeDelivery}>{t("markAsDelivered")}</Button>
        </ActionRoot>
    );
}