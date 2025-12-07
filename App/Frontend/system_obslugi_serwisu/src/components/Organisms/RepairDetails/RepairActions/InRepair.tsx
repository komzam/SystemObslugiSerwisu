import {useTranslations} from "next-intl";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";
import {useToast} from "@/components/Utils/ToastNotifications";
import {useMutation} from "@apollo/client/react";
import {
    CompleteRepairFailureMutation, CompleteRepairFailureMutationVariables,
    CompleteRepairSuccessMutation,
    CompleteRepairSuccessMutationVariables, CurrencyCode
} from "@/__generated__/types";
import {COMPLETE_REPAIR_SUCCESS} from "@/graphql/RepairActions/CompleteRepairSuccess";
import {COMPLETE_REPAIR_FAILURE} from "@/graphql/RepairActions/CompleteRepairFailure";
import {useState} from "react";
import DialogWindow from "@/components/Molecules/DialogWindow";
import {TextArea} from "@/components/Atoms/TextArea";
import * as React from "react";
import {ErrorName} from "@/components/Utils/ErrorName";
import {CurrencySelect} from "@/components/Organisms/Select/CurrencySelect";
import {LabeledTextInput} from "@/components/Molecules/LabeledTextInput";
import {LabeledSwitch} from "@/components/Molecules/LabeledSwitch";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

type FinalPriceForm = {
    finalCostCurrency: CurrencyCode;
    finalCost: number | "";
}

const defaultFinalPriceForm : FinalPriceForm = {
    finalCostCurrency: CurrencyCode.Pln,
    finalCost: ""
}

export function InRepair({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.InRepair");
    const tComm = useTranslations("RepairActions.Common");
    const tErr = useTranslations("Errors");
    const toasts = useToast();
    const [differentFinal, setDifferentFinal] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [finalPriceForm, setFinalPriceForm] = useState<FinalPriceForm>(defaultFinalPriceForm);

    const [completeRepairSuccess] = useMutation<CompleteRepairSuccessMutation, CompleteRepairSuccessMutationVariables>(COMPLETE_REPAIR_SUCCESS);
    const [completeRepairFailure] = useMutation<CompleteRepairFailureMutation, CompleteRepairFailureMutationVariables>(COMPLETE_REPAIR_FAILURE);
    const onCompleteSuccess = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            if(differentFinal && finalPriceForm.finalCost ==""){
                e.preventDefault();
                return;
            }
            await completeRepairSuccess({variables:{repairId, description:description?description:null, ...(differentFinal && finalPriceForm)}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
            e.preventDefault();
        }
    }

    const onCompleteFailure = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            await completeRepairFailure({variables:{repairId, description:description?description:null}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
            e.preventDefault();
        }
    }

    return (
        <ActionRoot>
            <ActionMessage>{t("message")}</ActionMessage>
            <DialogWindow.Root>
                <DialogWindow.Trigger asChild>
                    <Button variant="secondary">{t("completeFailure")}</Button>
                </DialogWindow.Trigger>

                <DialogWindow.Window aria-describedby="" className="w-full max-w-xl">
                    <DialogWindow.Title>{tComm("addDescriptionTitle")}</DialogWindow.Title>

                    <div className="flex flex-col gap-5">

                        <TextArea
                            id="completeFailureDescription"
                            placeholder={t("descriptionPlaceholderFailure")}
                            className="w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <DialogWindow.Close asChild>
                            <Button
                                className="w-full sm:w-auto sm:self-end"
                                onClick={(e) => onCompleteFailure(e)}
                            >
                                {t("completeFailure")}
                            </Button>
                        </DialogWindow.Close>

                    </div>
                </DialogWindow.Window>
            </DialogWindow.Root>

            <DialogWindow.Root>
                <DialogWindow.Trigger asChild>
                    <Button>{t("completeSuccess")}</Button>
                </DialogWindow.Trigger>

                <DialogWindow.Window aria-describedby="" className="w-full max-w-xl">
                    <DialogWindow.Title>{tComm("addDescriptionTitle")}</DialogWindow.Title>

                    <div className="bg-inherit flex flex-col gap-5">
                        <LabeledSwitch id={"differentFinalPrice"}
                                       label={t("differentFinalPrice")}
                                       checked={differentFinal}
                                       onChange={(v) => setDifferentFinal(v)}/>
                        {
                            differentFinal &&
                            <>
                            <CurrencySelect classNamePortal={"z-[51]"}
                                            value={finalPriceForm.finalCostCurrency}
                                            onChange={value => setFinalPriceForm((prev) => ({...prev, finalCostCurrency: value}))}/>

                            <LabeledTextInput type="number" label={t("finalPrice")} id="finalPrice"
                                              value={finalPriceForm.finalCost}
                                              onChange={(e) => setFinalPriceForm((prev) => ({
                                                  ...prev,
                                                  finalCost: e.target.value === "" ? "" : Number(e.target.value)
                                              }))}/>
                            </>
                        }
                        <TextArea
                            id="completeSuccessDescription"
                            placeholder={t("descriptionPlaceholderSuccess")}
                            className="w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <DialogWindow.Close asChild>
                            <Button
                                className="w-full sm:w-auto sm:self-end"
                                onClick={(e) => onCompleteSuccess(e)}
                            >
                                {t("completeSuccess")}
                            </Button>
                        </DialogWindow.Close>

                    </div>
                </DialogWindow.Window>
            </DialogWindow.Root>
        </ActionRoot>
    );
}