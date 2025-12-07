import {Card} from "@/components/Atoms/Card";
import {Button} from "@/components/Atoms/Button";
import {useTranslations} from "next-intl";
import { LuMessageSquare } from "react-icons/lu";
import {RepairStatus} from "@/__generated__/types";
import {Link} from "@/i18n/navigation";
import {RepairStatusC} from "@/components/Molecules/RepairStatus";
import {ReactNode} from "react";

export type RepairDetailsTitleProps = {
    title: string;
    repairTicketNumber: string;
    status: RepairStatus;
    conversationId: string;
}

export function RepairDetailsTitle({ title, repairTicketNumber, status, conversationId}: RepairDetailsTitleProps) {

    return (
        <RepairDetailsTitle.Root>
                <RepairDetailsTitle.Title title={title} repairTicketNumber={repairTicketNumber}/>
                <RepairDetailsTitle.Conversation conversationId={conversationId} />
                <RepairDetailsTitle.Status status={status}/>
        </RepairDetailsTitle.Root>
    )
}
RepairDetailsTitle.Root = Root;
RepairDetailsTitle.Title = Title;
RepairDetailsTitle.Conversation = Conversation;
RepairDetailsTitle.Status = Status;

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
    title: string;
    subtitle?: string;
    repairTicketNumber: string;
}

function Title({title, subtitle, repairTicketNumber}: TitleProps){
    return (
        <div className="flex flex-col w-full">
            <span className="text-larger1 font-bold line-clamp-2 text-ellipsis">{title}</span>
            {subtitle && <span className="font-bold text-accent4 line-clamp-2 text-ellipsis">{subtitle}</span>}
            <span className="text-accent4">{repairTicketNumber}</span>
        </div>
    );
}

type ConversationProps = {
    conversationId?: string;
    repairShopSide?: boolean;
}
function Conversation({conversationId, repairShopSide=false} : ConversationProps) {
    const t = useTranslations("RepairDetails");
    return (
        <div className="order-3 sm:order-2 w-full sm:w-auto">
            {conversationId != null &&
                <Link href={`/messages/${conversationId}`} className="w-full flex">
                    <Button className="w-full" variant="secondary" icon={<LuMessageSquare size="1.5rem" />}>
                        {repairShopSide? t("messageCustomer") : t("messageUs")}
                    </Button>
                </Link>
            }
        </div>
    );
}

type StatusProps = {
    status: RepairStatus;
}
function Status({status}:StatusProps) {
    return (
        <div className="order-2 sm:order-3 flex justify-start sm:justify-end">
            <RepairStatusC type={status} />
        </div>
    );
}