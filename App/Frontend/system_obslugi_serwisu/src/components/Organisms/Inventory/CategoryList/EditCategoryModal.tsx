import DialogWindow from "@/components/Molecules/DialogWindow";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {GetPartCategoriesQuery} from "@/__generated__/types";
import {LabeledTextInput} from "@/components/Molecules/LabeledTextInput";
import {Button} from "@radix-ui/themes";

type EditCategoryProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: GetPartCategoriesQuery["partCategories"][0];
    onEdit: (editedCategory: GetPartCategoriesQuery["partCategories"][0]) => void;
}
export function EditCategory({open, onOpenChange, category, onEdit}: EditCategoryProps) {
    const t = useTranslations("CategoryList");
    const [categoryName, setCategoryName] = useState<string>("");

    useEffect(() => {
        setCategoryName(category.name);
    },[open])

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        if(categoryName == ""){
            e.preventDefault();
            return;
        }
        onEdit({id:category.id, name:categoryName});
    }

    const cleanVariables = () => {
        setCategoryName("");
    }

    return(
        <DialogWindow.Root open={open} onOpenChange={onOpenChange}>
            <DialogWindow.Window onCloseAutoFocus={cleanVariables}>
                <DialogWindow.Title>{t("editCategoryTitle")}</DialogWindow.Title>
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
                            {t("confirm")}
                        </Button>
                    </DialogWindow.Close>
                </div>
            </DialogWindow.Window>
        </DialogWindow.Root>
    );
}