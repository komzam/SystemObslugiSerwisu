import {GetPartsQuery} from "@/__generated__/types";
import {useTranslations} from "next-intl";
import {RSListHeader, RsListHeaderCell} from "@/components/Molecules/RSList/RSListHeader";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {RSList} from "@/components/Molecules/RSList/RSList";
import {RsListCell, RSListRow} from "@/components/Molecules/RSList/RSListRow";
import {PageSelector} from "@/components/Molecules/PageSelector";
import {CheckboxProps} from "@/components/Atoms/Checkbox";

export type RSPartListProps = {
    parts: GetPartsQuery["parts"]["items"];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    selectedItems: string[];
    onSelectedItemsChange: (selectedItems: string[]) => void;
    isLoading: boolean;
}

export function RSPartsToOrder({parts, currentPage, totalPages, onPageChange, selectedItems, onSelectedItemsChange, isLoading=false}: RSPartListProps) {
    const t = useTranslations("PartList");

    const onSelectedChange = (selected: boolean, id: string) => {
        if(selected){
            onSelectedItemsChange([...selectedItems, id]);
        }else{
            onSelectedItemsChange(selectedItems.filter(itemId => itemId !== id));
        }
    };

    const headerCells:RsListHeaderCell[] = [
        {title:"", checkbox:true},
        {title:t("partName")},
        {title:t("category")},
        {title:t("stock")},
        {title:t("price")}
    ]

    return(
        <div className="w-full flex flex-col gap-5">
            {isLoading? <LoadingIcon/>:
                <RSList columns={[{width:"auto"},{width:"1.5fr"},{width:"1.5fr"},{width:"1fr"},{width:"1fr"}]}>
                    <RSListHeader cells={headerCells}/>
                    {parts.map((part, partIndex) => {
                        const checkBoxProps :CheckboxProps= {
                            onCheckedChange: (checked) => onSelectedChange(checked as boolean, part.id)
                        }

                        const cells: RsListCell[] = [
                            {kind: "checkbox", content: checkBoxProps},
                            {kind: "textBold", content: part.name},
                            {kind: "text", content: part.category?.name??""},
                            {kind: "stockLevel", level: part.stockLevel, stock: part.stock},
                            {kind: "text", content: part.price}
                        ];

                        return <RSListRow key={partIndex} cells={cells} separator={partIndex < parts.length - 1}/>;
                    })}
                </RSList>
            }
            <div className="flex w-full justify-end">
                <PageSelector currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
            </div>
        </div>
    )
}