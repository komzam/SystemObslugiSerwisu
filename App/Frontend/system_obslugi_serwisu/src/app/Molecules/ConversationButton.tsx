import {useFormatter} from "next-intl";
import {Link} from "@/i18n/navigation";

export type ConversationButtonProps = {
    id: string;
    title: string;
    date: Date;
    lastMessage: string;
    isSelected?: boolean;
};

export function ConversationButton({id, title, date, lastMessage, isSelected=false}: ConversationButtonProps) {
    const format = useFormatter();
    return (
        <Link href={`/messages/${id}`}>
            <div className={`flex flex-col px-2 py-5 shadow-md gap-4 rounded-xl w-full ${isSelected? "bg-secondary": "bg-white hover:bg-accent2"}`}>
                <div className="flex flex-row gap-2">
                    <span className="flex-1 font-bold whitespace-nowrap">{title}</span>
                    <span className="text-smaller2 text-accent4">{format.relativeTime(date, Date.now())}</span>
                </div>
                <p className="line-clamp-1 text-ellipsis">{lastMessage}</p>
            </div>
        </Link>
    )
}