import {useTranslations} from "next-intl";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";
import {ShipMutation, ShipMutationVariables} from "@/__generated__/types";
import {SHIP} from "@/graphql/RepairActions/Ship";
import {useMutation} from "@apollo/client/react";
import {useToast} from "@/components/Utils/ToastNotifications";
import {ErrorName} from "@/components/Utils/ErrorName";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

export function AwaitingShipping({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.AwaitingShipping");
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const [ship] = useMutation<ShipMutation, ShipMutationVariables>(SHIP);
    const onShip = async () => {
        try {
            await ship({variables:{repairId}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    return (
        <ActionRoot>
            <ActionMessage>{t("message")}</ActionMessage>
            <Button onClick={onShip}>{t("markAsShipped")}</Button>
        </ActionRoot>
    );
}