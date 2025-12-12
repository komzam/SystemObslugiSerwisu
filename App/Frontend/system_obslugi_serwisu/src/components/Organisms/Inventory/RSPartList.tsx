import {GetPartsQuery, RepairFilterInput, RepairStatus} from "@/__generated__/types";
import {useTranslations} from "next-intl";
import {RSListHeader, RsListHeaderCell} from "@/components/Molecules/RSList/RSListHeader";
import {Card} from "@/components/Atoms/Card";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {RSList} from "@/components/Molecules/RSList/RSList";
import {RsListCell, RSListRow} from "@/components/Molecules/RSList/RSListRow";
import {PageSelector} from "@/components/Molecules/PageSelector";
import {useRouter} from "@/i18n/navigation";


export type RSPartListProps = {
    parts: GetPartsQuery["parts"]["items"];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onDelete: (id: string) => void;
    isLoading: boolean;
}

export function RSPartList({parts, currentPage, totalPages, onPageChange, onDelete, isLoading=false}: RSPartListProps) {
    const t = useTranslations("PartList");
    const router = useRouter();

    const headerCells:RsListHeaderCell[] = [
        {title:t("partName")},
        {title:t("category")},
        {title:t("stock")},
        {title:t("price")},
        {title:t("actions")}
    ]

    return(
        <div className="w-full flex flex-col gap-5">
            {isLoading? <LoadingIcon/>:
                <RSList columns={[{width:"1.5fr"},{width:"1.5fr"},{width:"1fr"},{width:"1fr"},{width:"auto"}]}>
                    <RSListHeader cells={headerCells}/>
                    {parts.map((part, partIndex) => {
                        const cells: RsListCell[] = [
                            {kind: "textBold", content: part.name},
                            {kind: "text", content: part.category?.name??""},
                            {kind: "stockLevel", level: part.stockLevel, stock: part.stock},
                            {kind: "text", content: part.price},
                            {
                                kind: "options",
                                options: [{
                                    valueLabel: t("viewDetails"),
                                    onClick: () => router.push(`/inventory/part/${part.id}`)
                                }, {valueLabel: t("delete"), onClick: () => onDelete(part.id)}]
                            }
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