import {Card} from "@/components/Atoms/Card";
import {useTranslations} from "next-intl";
import {Button} from "@/components/Atoms/Button";
import {
    AdjustStockMutation,
    AdjustStockMutationVariables,
    ChangeReorderFlagMutation,
    ChangeReorderFlagMutationVariables
} from "@/__generated__/types";
import {CHANGE_REORDER_FLAG} from "@/graphql/ChangeReorderFlag";
import {useMutation} from "@apollo/client/react";
import {useToast} from "@/components/Utils/ToastNotifications";
import {ErrorName} from "@/components/Utils/ErrorName";
import DialogWindow from "@/components/Molecules/DialogWindow";
import {LabeledTextInput} from "@/components/Molecules/LabeledTextInput";
import {useState} from "react";
import * as React from "react";
import {ADJUST_STOCK} from "@/graphql/AdjustStock";

type PartDetailsActionsProps = {
    partId: string;
    needsReorder: boolean;
    stock: number;
    onActionSuccess: () => void;
}

export function PartDetailsActions({partId, needsReorder, stock, onActionSuccess}: PartDetailsActionsProps) {
    const t = useTranslations("PartDetails");
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const [changeReorderFlag] = useMutation<ChangeReorderFlagMutation, ChangeReorderFlagMutationVariables>(CHANGE_REORDER_FLAG);
    const [adjustStock] = useMutation<AdjustStockMutation, AdjustStockMutationVariables>(ADJUST_STOCK);

    const onChangeReorderFlag = async () =>{
        try{
            await changeReorderFlag({variables:{partId}});
            onActionSuccess();
        }catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    const onAdjustStock = async (newStock: number) =>{
        try{
            await adjustStock({variables:{partId, newStock}});
            onActionSuccess();
        }catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    return (
        <Card className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3">
            <p className="flex flex-row items-center gap-2 font-bold">
                {t("managePartMessage")}
            </p>
            <AdjustStock stock={stock} onAdjustStock={onAdjustStock}/>
            <Button onClick={onChangeReorderFlag}>{needsReorder? t("removeReorderFlag") : t("flagForReorder")}</Button>
        </Card>
    );
}

type AdjustStockProps = {
    stock: number;
    onAdjustStock: (newStock: number) => void;
}
function AdjustStock({stock, onAdjustStock}: AdjustStockProps) {
    const t = useTranslations("PartDetails");
    const [newStock, setNewStock] = useState<number|"">(stock);

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        if(newStock == ""){
            e.preventDefault();
            return;
        }
        onAdjustStock(Number(newStock));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setNewStock("");
            return;
        }
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            setNewStock(intValue);
        }
    };

    return (
        <DialogWindow.Root>
            <DialogWindow.Trigger asChild>
                <Button variant="secondary">{t("adjustStock")}</Button>
            </DialogWindow.Trigger>
            <DialogWindow.Window aria-describedby="" className="w-xs">
                <DialogWindow.Title>{t("adjustStockTitle")}</DialogWindow.Title>
                <LabeledTextInput
                    id="newStock"
                    type="number"
                    step="1"
                    value={newStock}
                    onChange={handleChange}
                    wrapperClassName="mb-3 w-full"
                    className="w-full"
                    label={t("newStock")}/>
                <DialogWindow.Close asChild>
                    <Button onClick={onSubmit}
                            variant="secondary">
                        {t("adjustStock")}
                    </Button>
                </DialogWindow.Close>
            </DialogWindow.Window>
        </DialogWindow.Root>

    );
}