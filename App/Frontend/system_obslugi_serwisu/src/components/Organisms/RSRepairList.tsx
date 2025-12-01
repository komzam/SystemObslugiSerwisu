import {RepairStatus} from "@/__generated__/types";
import {RsListCell, RSListRow} from "@/components/Molecules/RSList/RSListRow";
import {RSListHeader, RsListHeaderCell} from "@/components/Molecules/RSList/RSListHeader";
import {Card} from "@/components/Atoms/Card";
import {RSList} from "@/components/Molecules/RSList/RSList";
import {PageSelector} from "@/components/Molecules/PageSelector";
import {useTranslations} from "next-intl";

export type RepairListRepair = {
    id: string,
    ticketNumber: string,
    customer: {
        name: string,
    }
    deviceInfo: {
        model: string,
        manufacturer: string,
    },
    status: RepairStatus,
    technician?: string,
    createdAt: Date
}

export type RSRepairListProps = {
    repairs: RepairListRepair[]
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

export function RSRepairList({repairs, currentPage, totalPages, onPageChange}: RSRepairListProps) {
    const t = useTranslations("RepairList");

    const headerCells:RsListHeaderCell[] = [
        {title:t("ticketNumber")},
        {title:t("customer")},
        {title:t("device")},
        {title:t("status")},
        {title:t("technician")},
        {title:t("createdAt")},
        {title:t("actions")}
    ]

    return(
        <div className="flex flex-col w-full">
            <Card className="w-full flex flex-col gap-5">
                <RSList columns={[{width:"1fr"},{width:"2fr"},{width:"2fr"},{width:"1fr"},{width:"1fr"},{width:"1fr"},{width:"auto"}]}>
                    <RSListHeader cells={headerCells}/>
                    {repairs.map((repair, repairIndex) => {
                        const cells: RsListCell[] = [
                            {kind: "textBold", content: repair.ticketNumber},
                            {kind: "text", content: repair.customer.name},
                            {kind: "text", content: repair.deviceInfo.manufacturer + " " + repair.deviceInfo.model},
                            {kind: "repairStatus", content: repair.status},
                            {kind: "text", content: repair.technician??t("unassigned")},
                            {kind: "text", content: repair.createdAt.toLocaleDateString()},
                            {kind: "link", content: t("viewDetails"), href:`/repair/${repair.id}`},
                        ];

                        return <RSListRow key={repairIndex} cells={cells} separator={repairIndex < repairs.length - 1}/>;
                    })}
                </RSList>
                <div className="flex w-full justify-end">
                    <PageSelector currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
                </div>
            </Card>
        </div>
    )
}