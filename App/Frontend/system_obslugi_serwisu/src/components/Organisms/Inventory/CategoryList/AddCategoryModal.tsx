import { useToast } from "@/components/Utils/ToastNotifications";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {useMutation} from "@apollo/client/react";
import {AddPartCategoryMutation, AddPartCategoryMutationVariables} from "@/__generated__/types";
import {ADD_PART_CATEGORY} from "@/graphql/AddPartCategory";
import * as React from 'react';
import {ErrorName} from "@/components/Utils/ErrorName";
import DialogWindow from "@/components/Molecules/DialogWindow";
import {LabeledTextInput} from "@/components/Molecules/LabeledTextInput";
import {Button} from "@/components/Atoms/Button";

type AddCategoryModalProps = {
    onAdd: (name: string) => void;
}
export function AddCategory({onAdd}: AddCategoryModalProps) {
    const t = useTranslations("CategoryList");
    const [categoryName, setCategoryName] = useState<string>("");

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        if(categoryName == ""){
            e.preventDefault();
            return;
        }

        onAdd(categoryName);
    }

    const cleanVariables = () => {
        setCategoryName("");
    }

    return (
        <DialogWindow.Root>
            <DialogWindow.Trigger asChild>
                <Button>{t("addCategory")}</Button>
            </DialogWindow.Trigger>
            <DialogWindow.Window aria-describedby="" className="w-sm" onCloseAutoFocus={cleanVariables}>
                <DialogWindow.Title>{t("addCategoryTitle")}</DialogWindow.Title>

                <div className="bg-inherit grid grid-cols-1 gap-3">
                    <LabeledTextInput
                        wrapperClassName="w-full col-span-3" className="w-full"
                        label={t("categoryName")}
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <DialogWindow.Close asChild>
                        <Button className="col-span-1 col-start-3 ml-auto w-fit"
                                onClick={onSubmit}
                                disabled={categoryName==""}
                        >
                            {t("addCategory")}
                        </Button>
                    </DialogWindow.Close>
                </div>

            </DialogWindow.Window>
        </DialogWindow.Root>
    );
}