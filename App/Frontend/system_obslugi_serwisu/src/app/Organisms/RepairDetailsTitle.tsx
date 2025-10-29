import {Status} from "@/app/Atoms/Status";
import {Card} from "@/app/Atoms/Card";
import {Button} from "@/app/Atoms/Button";
import {useTranslations} from "next-intl";
import { LuMessageSquare } from "react-icons/lu";
import {RepairStatus} from "@/__generated__/types";

export type RepairDetailsTitleProps = {
    title: string;
    repairTicketNumber: string;
    status: RepairStatus
}

export function RepairDetailsTitle({ title, repairTicketNumber, status }: RepairDetailsTitleProps) {
    const t = useTranslations("RepairDetails");

    return (
        <Card>
            <div className="flex flex-col gap-5 w-full">
                <div className="flex flex-row gap-2 w-full items-center">
                    <div className="flex-1 flex flex-col w-full">
                        <span className="text-larger1 font-bold line-clamp-2 text-ellipsis">{title}</span>
                        <span className="text-accent4">{repairTicketNumber}</span>
                    </div>
                    <div className="flex flex-row gap-2 sm:gap-5 items-center">
                        <Button className="hidden md:flex" variant="secondary" icon={<LuMessageSquare size="1.5rem"/>}>{t("messageUs")}</Button>
                        <Status className="hidden sm:flex" type={status}/>
                    </div>
                </div>
                <Status className="sm:hidden" type={status}/>
                <Button className="w-full md:hidden" variant="secondary" icon={<LuMessageSquare size="1.5rem"/>}>{t("messageUs")}</Button>
            </div>
        </Card>
    )
}