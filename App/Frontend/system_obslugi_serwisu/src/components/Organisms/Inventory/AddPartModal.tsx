import {useTranslations} from "next-intl";
import {useState} from "react";
import * as React from "react";
import DialogWindow from "@/components/Molecules/DialogWindow";
import {Button} from "@/components/Atoms/Button";
import {LabeledTextInput} from "@/components/Molecules/LabeledTextInput";
import { AddPartRequestInput } from "@/__generated__/types";
import {PartCategorySelect} from "@/components/Organisms/Select/PartCategorySelect";

export type AddPartForm = {
    partName: string;
    manufacturerCode: string;
    category: string;
    initialStock: number|"";
    price: number|"";
    lowStockThreshold: number|"";
}
const defaultAddPartForm : AddPartForm = {
    partName: "",
    manufacturerCode: "",
    category: "",
    initialStock: "",
    price: "",
    lowStockThreshold: ""
}

type AddPartProps = {
    onAdd: (addPartFrom: AddPartRequestInput) => void;
}
export function AddPart({onAdd}: AddPartProps) {
    const t = useTranslations("PartList");
    const [addPartForm, setAddPartForm] = useState<AddPartForm>(defaultAddPartForm);

    const editForm = <K extends keyof AddPartForm>(key: K, value: AddPartForm[K]) => {
        setAddPartForm((prev) => ({...prev, [key]: value}));
    }

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        if(!Object.values(addPartForm).every(value => value !== "")){
            e.preventDefault();
            return;
        }

        onAdd({
            name: addPartForm.partName,
            manufacturerCode: addPartForm.manufacturerCode,
            partCategoryId: addPartForm.category,
            initialStock: addPartForm.initialStock as number,
            price: addPartForm.price as number,
            lowStockThreshold: addPartForm.lowStockThreshold as number
        });
    }

    const cleanVariables = () => {
        setAddPartForm(defaultAddPartForm);
    }

    return (
        <DialogWindow.Root>
            <DialogWindow.Trigger asChild>
                <Button>{t("addPart")}</Button>
            </DialogWindow.Trigger>
            <DialogWindow.Window aria-describedby="" className="w-2xl" onCloseAutoFocus={cleanVariables}>
                <DialogWindow.Title>{t("addPart")}</DialogWindow.Title>

                <div className="bg-inherit grid grid-cols-3 gap-4">
                    <LabeledTextInput
                        wrapperClassName="w-full col-span-3" className="w-full"
                        label={t("partName")}
                        id="partName"
                        value={addPartForm.partName}
                        onChange={(e) => editForm("partName", e.target.value)}
                    />
                    <LabeledTextInput
                        wrapperClassName="w-full col-span-3" className="w-full"
                        label={t("manufacturerCode")}
                        id="manufacturerCode"
                        value={addPartForm.manufacturerCode}
                        onChange={(e) => editForm("manufacturerCode", e.target.value)}
                    />
                    <PartCategorySelect
                        classNameTrigger="col-start-1 col-end-2"
                        onValueChange={(value) => editForm("category", value)}
                    />
                    <LabeledTextInput
                        wrapperClassName="w-full col-span-1 col-start-1" className="w-full"
                        type="number"
                        label={t("initialStock")}
                        id="initialStock"
                        value={addPartForm.initialStock}
                        onChange={(e) => editForm("initialStock", Number(e.target.value)||"")}
                    />
                    <LabeledTextInput
                        wrapperClassName="w-full col-span-1" className="w-full"
                        type="number"
                        label={t("lowStockThreshold")}
                        id="lowStockThreshold"
                        value={addPartForm.lowStockThreshold}
                        onChange={(e) => editForm("lowStockThreshold", Number(e.target.value)||"")}
                    />
                    <LabeledTextInput
                        wrapperClassName="w-full col-span-1" className="w-full"
                        type="number"
                        label={t("price")}
                        id="newPartPrice"
                        value={addPartForm.price}
                        onChange={(e) => editForm("price", Number(e.target.value)||"")}
                    />
                    <DialogWindow.Close asChild>
                        <Button className="col-span-1 col-start-3 ml-auto w-fit"
                                onClick={onSubmit}
                                disabled={!Object.values(addPartForm).every(value => value !== "")}
                        >
                            {t("addPart")}
                        </Button>
                    </DialogWindow.Close>
                </div>

            </DialogWindow.Window>
        </DialogWindow.Root>
    );
}