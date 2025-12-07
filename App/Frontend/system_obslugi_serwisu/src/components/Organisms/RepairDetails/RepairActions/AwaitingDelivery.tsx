import {useTranslations} from "next-intl";
import {useToast} from "@/components/Utils/ToastNotifications";
import {useMutation} from "@apollo/client/react";
import {CheckInAndQueueMutation, CheckInAndQueueMutationVariables} from "@/__generated__/types";
import {CHECK_IN_AND_QUEUE} from "@/graphql/RepairActions/CheckInAndQueue";
import {ErrorName} from "@/components/Utils/ErrorName";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";
import DialogWindow from "@/components/Molecules/DialogWindow";
import {useState} from "react";
import * as React from "react";
import {TextArea} from "@/components/Atoms/TextArea";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

export function AwaitingDelivery({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.AwaitingDelivery");
    const tComm = useTranslations("RepairActions.Common");
    const tErr = useTranslations("Errors");
    const [description, setDescription] = useState<string>("");
    const toasts = useToast();

    const [checkInAndQueue] = useMutation<CheckInAndQueueMutation, CheckInAndQueueMutationVariables>(CHECK_IN_AND_QUEUE);
    const onMarkAsReceived = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            await checkInAndQueue({variables: {repairId, description: description ? description : null}});
            onActionSuccess();
        } catch (err) {
            e.preventDefault();
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    return (
        <ActionRoot>
            <ActionMessage>{t("message")}</ActionMessage>
            <DialogWindow.Root>
                <DialogWindow.Trigger asChild>
                    <Button>{t("markAsReceived")}</Button>
                </DialogWindow.Trigger>

                <DialogWindow.Window aria-describedby="" className="w-full max-w-xl">
                    <DialogWindow.Title>{tComm("addDescriptionTitle")}</DialogWindow.Title>

                    <div className="flex flex-col gap-5">

                        <TextArea
                            id="markAsReceivedDescription"
                            placeholder={t("descriptionPlaceholder")}
                            className="w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <DialogWindow.Close asChild>
                            <Button
                                className="w-full sm:w-auto sm:self-end"
                                onClick={(e) => onMarkAsReceived(e)}
                            >
                                {t("markAsReceived")}
                            </Button>
                        </DialogWindow.Close>

                    </div>
                </DialogWindow.Window>
            </DialogWindow.Root>
        </ActionRoot>
    );
}