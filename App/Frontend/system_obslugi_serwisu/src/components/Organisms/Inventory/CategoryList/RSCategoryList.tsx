import {
    GetPartCategoriesQuery
} from "@/__generated__/types";
import {useTranslations} from "next-intl";
import {RSListHeader, RsListHeaderCell} from "@/components/Molecules/RSList/RSListHeader";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {RSList} from "@/components/Molecules/RSList/RSList";
import {RsListCell, RSListRow} from "@/components/Molecules/RSList/RSListRow";
import {useState} from "react";
import {AddCategory} from "@/components/Organisms/Inventory/CategoryList/AddCategoryModal";
import * as React from "react";
import {EditCategory} from "@/components/Organisms/Inventory/CategoryList/EditCategoryModal";

export type RSPartListProps = {
    categories: GetPartCategoriesQuery["partCategories"];
    onDelete: (id: string) => void;
    onEdit: (category: GetPartCategoriesQuery["partCategories"][0]) => void;
    onAdd: (name: string) => void;
    isLoading: boolean;
}

const defaultCategory= {
    id: "",
    name: ""
}

export function RSCategoryList({categories, onDelete, onEdit, onAdd, isLoading=false}: RSPartListProps) {
    const t = useTranslations("CategoryList");
    const [editOpen, setEditOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<GetPartCategoriesQuery["partCategories"][0]>(defaultCategory);
    const headerCells:RsListHeaderCell[] = [
        {title:t("categoryName")},
        {title:t("actions")}
    ]

    const onOpenEdit = (id: string) => {
        setEditOpen(true);
        setSelectedCategory(categories.find(c => c.id == id)??defaultCategory);
    }


    return(
        <div className="w-full flex flex-col gap-5">
            <div className="w-fit ml-auto"><AddCategory onAdd={onAdd}/></div>
            {isLoading? <LoadingIcon/>:
                <RSList columns={[{width:"1fr"},{width:"auto"}]}>
                    <RSListHeader cells={headerCells}/>
                    {categories.map((category, categoryIndex) => {
                        const cells: RsListCell[] = [
                            {kind: "textBold", content: category.name},
                            {
                                kind: "options",
                                options: [
                                    {valueLabel: t("edit"), onClick: () => onOpenEdit(category.id)},
                                    {valueLabel: t("delete"), onClick: () => onDelete(category.id)}
                                ]
                            }
                        ];

                        return <RSListRow key={categoryIndex} cells={cells} separator={categoryIndex < categories.length - 1}/>;
                    })}
                </RSList>
            }
            <EditCategory open={editOpen} onOpenChange={setEditOpen} category={selectedCategory} onEdit={onEdit}/>
        </div>
    )
}