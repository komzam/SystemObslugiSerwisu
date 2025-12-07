import {useTranslations} from "next-intl";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";
import {PickupMutation, PickupMutationVariables} from "@/__generated__/types";
import {PICKUP} from "@/graphql/RepairActions/Pickup";
import {useMutation} from "@apollo/client/react";
import {useToast} from "@/components/Utils/ToastNotifications";
import {ErrorName} from "@/components/Utils/ErrorName";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

export function ReadyForPickup({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.ReadyForPickup");
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const [pickup] = useMutation<PickupMutation, PickupMutationVariables>(PICKUP);
    const onPickup = async () => {
        try {
            await pickup({variables:{repairId}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }
    return (
        <ActionRoot>
            <ActionMessage type="info">{t("message")}</ActionMessage>
            <Button onClick={onPickup}>{t("markAsPickedUp")}</Button>
        </ActionRoot>
    );
}