import {GetPartsQuery, GetPartsQueryVariables} from "@/__generated__/types";
import {useQuery} from "@apollo/client/react";
import {GET_PARTS} from "@/graphql/GetParts";
import {RSPartsToOrder} from "@/components/Organisms/RSPartsToOrder";
import { Button } from "@/components/Atoms/Button";
import {useTranslations} from "next-intl";
import DialogWindow from "@/components/Molecules/DialogWindow";
import {LabeledTextInput} from "@/components/Molecules/LabeledTextInput";
import {useState} from "react";
import * as React from "react";

type PartsToOrderProps = {
    selectedPage: number;
    onPageChange: (page: number) => void;
}
export function PartsToOrder({selectedPage, onPageChange}: PartsToOrderProps) {
    const [selectedParts, setSelectedParts] = useState<string[]>([]);
    const {
        data,
        loading
    } = useQuery<GetPartsQuery, GetPartsQueryVariables>(GET_PARTS, {
        variables: {
            pageNumber: selectedPage,
            pageSize: 10,
            filter: {needsReorder: true}
        }
    });

    const onCreateOrder = (supplierName: string, supplierOrderNumber: string) => {
        console.log(selectedParts, supplierName, supplierOrderNumber);
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-end">
                <CreateOrderFromSelected
                    anythingSelected={selectedParts.length > 0}
                    onCreateOrder={onCreateOrder}
                />
            </div>
            <RSPartsToOrder
                parts={data?.parts.items??[]}
                currentPage={selectedPage}
                onPageChange={onPageChange}
                totalPages={data?.parts.totalPages??1}
                selectedItems={selectedParts}
                onSelectedItemsChange={setSelectedParts}
                isLoading={loading}
            />
        </div>
    );
}

type CreateOrderFromSelectedProps = {
    anythingSelected: boolean;
    onCreateOrder: (supplierName:string, supplierOrderNumber: string) => void;
}
function CreateOrderFromSelected({anythingSelected, onCreateOrder}: CreateOrderFromSelectedProps) {
    const t = useTranslations("PartList");
    const [supplierName, setSupplierName] = useState("");
    const [supplierOrderNumber, setSupplierOrderNumber] = useState("");

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        if(!anythingSelected){
            e.preventDefault();
            return;
        }
        onCreateOrder(supplierName, supplierOrderNumber);
    }

    const cleanVariables = () => {
        setSupplierName("");
        setSupplierOrderNumber("");
    }

    return (
        <DialogWindow.Root>
            <DialogWindow.Trigger asChild>
                <Button>{t("createOrderFromSelected")}</Button>
            </DialogWindow.Trigger>
            <DialogWindow.Window aria-describedby="" className="w-md" onCloseAutoFocus={cleanVariables}>
                <DialogWindow.Title>{t("createOrderTitle")}</DialogWindow.Title>

                <div className="bg-inherit grid grid-cols-1 gap-2">
                    <LabeledTextInput
                        wrapperClassName="w-full" className="w-full"
                        label={t("supplierName")}
                        id="supplierName"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                    />
                    <LabeledTextInput
                        wrapperClassName="w-full" className="w-full"
                        label={t("supplierOrderNumber")}
                        id="supplierOrderNumber"
                        value={supplierOrderNumber}
                        onChange={(e) => setSupplierOrderNumber(e.target.value)}
                    />
                    <Button className="w-fit ml-auto" onClick={onSubmit} disabled={!supplierName || !supplierOrderNumber}>{t("addOrder")}</Button>
                </div>

            </DialogWindow.Window>
        </DialogWindow.Root>
    );
}