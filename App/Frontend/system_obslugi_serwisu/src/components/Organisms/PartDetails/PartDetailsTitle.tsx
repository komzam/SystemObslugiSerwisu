import {Card} from "@/components/Atoms/Card";
import {Button} from "@/components/Atoms/Button";
import {useTranslations} from "next-intl";
import { LuMessageSquare } from "react-icons/lu";
import {RepairStatus, StockLevel} from "@/__generated__/types";
import {Link} from "@/i18n/navigation";
import {RepairStatusC} from "@/components/Molecules/RepairStatus";
import {ReactNode} from "react";
import {PartStatus} from "@/components/Molecules/PartStatus";

export type PartDetailsTitleProps = {
    partName: string;
    category: string;
    stockLevel: StockLevel;
    stock: number;
}

export function PartDetailsTitle({ partName, category, stockLevel, stock}: PartDetailsTitleProps) {

    return (
        <PartDetailsTitle.Root>
                <PartDetailsTitle.Title partName={partName} category={category}/>
                <PartDetailsTitle.Status stockLevel={stockLevel} stock={stock}/>
        </PartDetailsTitle.Root>
    )
}
PartDetailsTitle.Root = Root;
PartDetailsTitle.Title = Title;
PartDetailsTitle.Status = Status;

    function Root({children}: {children:ReactNode}) {
    return (
        <Card>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-5 w-full items-center">
                {children}
            </div>
        </Card>
    );
};

type TitleProps = {
    partName: string;
    category: string;
}

function Title({partName, category}: TitleProps){
    const t = useTranslations("PartDetails");
    return (
        <div className="flex flex-col w-full">
            <span className="text-larger1 font-bold line-clamp-2 text-ellipsis">{partName}</span>
            <p>
                <span className={"text-accent3"}>{t("category")}: </span>
                <span className="text-accent4">{category}</span>
            </p>
        </div>
    );
}

type StatusProps = {
    stockLevel: StockLevel;
    stock: number;
}
function Status({stockLevel, stock}:StatusProps) {
    return (
        <div className="order-2 sm:order-3 flex justify-start sm:justify-end">
            <PartStatus level={stockLevel} stock={stock}/>
        </div>
    );
}