import {useTranslations} from "next-intl";
import {useToast} from "@/components/Utils/ToastNotifications";
import {useMutation} from "@apollo/client/react";
import {
    CurrencyCode,
    DeclareUnfixableMutation,
    DeclareUnfixableMutationVariables,
    SubmitQuoteMutation,
    SubmitQuoteMutationVariables
} from "@/__generated__/types";
import {DECLARE_UNFIXABLE} from "@/graphql/RepairActions/DeclareUnfixable";
import {SUBMIT_QUOTE} from "@/graphql/RepairActions/SubmitQuote";
import {ErrorName} from "@/components/Utils/ErrorName";
import {Button} from "@/components/Atoms/Button";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";
import DialogWindow from "@/components/Molecules/DialogWindow";
import {TextArea} from "@/components/Atoms/TextArea";
import * as React from "react";
import {useState} from "react";
import {CurrencySelect} from "@/components/Organisms/Select/CurrencySelect";
import {LabeledTextInput} from "@/components/Molecules/LabeledTextInput";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

type QuoteForm = {
    currency: CurrencyCode;
    partsCost: number | "";
    laborCost: number | "";
}

const defaultQuoteForm : QuoteForm = {
    currency: CurrencyCode.Pln,
    partsCost: "",
    laborCost: ""
}

export function Diagnosing({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.Diagnosing");
    const tComm = useTranslations("RepairActions.Common");
    const tErr = useTranslations("Errors");
    const toasts = useToast();
    const [description, setDescription] = useState<string>("");
    const [quoteForm, setQuoteForm] = useState<QuoteForm>(defaultQuoteForm);

    const [declareUnfixable] = useMutation<DeclareUnfixableMutation, DeclareUnfixableMutationVariables>(DECLARE_UNFIXABLE);
    const [submitQuote] = useMutation<SubmitQuoteMutation, SubmitQuoteMutationVariables>(SUBMIT_QUOTE);

    const onDeclareUnfixable = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            await declareUnfixable({variables:{repairId, description:description?description:null}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
            e.preventDefault();
        }
    }

    const onSubmitQuote = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(quoteForm.partsCost == "" || quoteForm.laborCost == ""){
            e.preventDefault();
            return;
        }
        try {
            await submitQuote({variables:{repairId, ...quoteForm, description:description?description:null}});
            onActionSuccess();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
            e.preventDefault();
        }finally{
            setQuoteForm(defaultQuoteForm);
            setDescription("");
        }
    }

    return (
        <ActionRoot>
            <ActionMessage>{t("message")}</ActionMessage>
            <DialogWindow.Root>
                <DialogWindow.Trigger asChild>
                    <Button variant="secondary">{t("declareUnfixable")}</Button>
                </DialogWindow.Trigger>

                <DialogWindow.Window aria-describedby="" className="w-full max-w-xl">
                    <DialogWindow.Title>{tComm("addDescriptionTitle")}</DialogWindow.Title>

                    <div className="flex flex-col gap-5">

                        <TextArea
                            id="declareUnfixableDescription"
                            placeholder={t("descriptionPlaceholder")}
                            className="w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <DialogWindow.Close asChild>
                            <Button
                                className="w-full sm:w-auto sm:self-end"
                                onClick={(e) => onDeclareUnfixable(e)}
                            >
                                {t("declareUnfixable")}
                            </Button>
                        </DialogWindow.Close>

                    </div>
                </DialogWindow.Window>
            </DialogWindow.Root>

            <DialogWindow.Root>
                <DialogWindow.Trigger asChild>
                    <Button>{t("submitQuote")}</Button>
                </DialogWindow.Trigger>

                <DialogWindow.Window aria-describedby="" className="w-full max-w-xl">
                    <DialogWindow.Title>{t("quoteDialogTitle")}</DialogWindow.Title>

                    <div className="bg-inherit flex flex-col gap-5">
                        <CurrencySelect classNamePortal={"z-[51]"}
                                        value={quoteForm.currency}
                                        onChange={value => setQuoteForm((prev) => ({...prev, currency: value}))}/>

                        <LabeledTextInput type="number" label={t("partsCost")} id="quotePartsCost"
                                          value={quoteForm.partsCost}
                                          onChange={(e) => setQuoteForm((prev) => ({
                                              ...prev,
                                              partsCost: e.target.value === "" ? "" : Number(e.target.value)
                                          }))}/>
                        <LabeledTextInput type="number" label={t("laborCost")} id="quoteLaborCost" required
                                          value={quoteForm.laborCost}
                                          onChange={(e) => setQuoteForm((prev) => ({
                                              ...prev,
                                              laborCost: e.target.value === "" ? "" : Number(e.target.value)
                                          }))}/>

                        <TextArea
                            id="submitQuoteDescription"
                            placeholder={t("descriptionPlaceholder")}
                            className="w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <DialogWindow.Close asChild>
                            <Button
                                className="w-full sm:w-auto sm:self-end"
                                onClick={(e) => onSubmitQuote(e)}
                            >
                                {t("submitQuote")}
                            </Button>
                        </DialogWindow.Close>

                    </div>
                </DialogWindow.Window>
            </DialogWindow.Root>
        </ActionRoot>
    );
}