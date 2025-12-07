import {useTranslations} from "next-intl";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";
import {useToast} from "@/components/Utils/ToastNotifications";
import {useMutation} from "@apollo/client/react";
import {
    PaymentCompletedMutation,
    PaymentCompletedMutationVariables
} from "@/__generated__/types";
import {ErrorName} from "@/components/Utils/ErrorName";
import {PAYMENT_COMPLETED} from "@/graphql/RepairActions/PaymentCompleted";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

export function FinalPaymentRequired({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.FinalPaymentRequired");
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const [paymentCompleted] = useMutation<PaymentCompletedMutation, PaymentCompletedMutationVariables>(PAYMENT_COMPLETED);
    const onPaymentCompleted = async () => {
        try {
            await paymentCompleted({variables:{repairId}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    return (
        <ActionRoot>
            <ActionMessage>{t("message")}</ActionMessage>
            <Button onClick={onPaymentCompleted}>{t("markAsPaid")}</Button>
        </ActionRoot>
    );
}