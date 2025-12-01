import {Card} from "@/components/Atoms/Card";
import {Button} from "@/components/Atoms/Button";
import {useTranslations} from "next-intl";
import { LuMessageSquare } from "react-icons/lu";
import {RepairStatus} from "@/__generated__/types";
import {Link} from "@/i18n/navigation";
import {RepairStatusC} from "@/components/Molecules/RepairStatus";

export type RepairDetailsTitleProps = {
    title: string;
    repairTicketNumber: string;
    status: RepairStatus;
    conversationId: string;
}

export function RepairDetailsTitle({ title, repairTicketNumber, status, conversationId}: RepairDetailsTitleProps) {
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
                        <Link href={`/messages/${conversationId}`}><Button className="hidden md:flex" variant="secondary" icon={<LuMessageSquare size="1.5rem"/>}>{t("messageUs")}</Button></Link>
                        <RepairStatusC className="hidden sm:flex" type={status}/>
                    </div>
                </div>
                <RepairStatusC className="sm:hidden" type={status}/>
                <Link href={`/messages/${conversationId}`}><Button className="w-full md:hidden" variant="secondary" icon={<LuMessageSquare size="1.5rem"/>}>{t("messageUs")}</Button></Link>
            </div>
        </Card>
    )
}