import {useFormatter} from "next-intl";
import {Link} from "@/i18n/navigation";
import {LuMessageSquare, LuWrench} from "react-icons/lu";

export type ConversationButtonProps = {
    id: string;
    type: "general"|"repair";
    title: string;
    date: Date;
    lastMessage: string;
    isSelected?: boolean;
};

export function ConversationButton({id, type, title, date, lastMessage, isSelected=false}: ConversationButtonProps) {
    const format = useFormatter();
    return (
        <Link href={`/messages/${id}`}>
            <div className={`flex flex-col px-2 py-5 shadow-md ring-1 gap-4 rounded-xl w-full ${isSelected? "bg-primary ring-secondary shadow-secondary": "bg-white hover:bg-accent2 ring-accent2"}`}>
                <div className="flex flex-row gap-2">
                    <span className={`flex-1 font-semibold whitespace-nowrap ${isSelected && "text-accent"}`}>{title}</span>
                    <span className={`text-smaller2 text-accent4 ${isSelected && "!text-accent"}`}>{format.relativeTime(date, Date.now())}</span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <p className={`flex-1 line-clamp-1 text-ellipsis text-accent4 ${isSelected && "!text-accent"}`}>{lastMessage}</p>
                    {type==="general"? <LuMessageSquare className={`text-accent4 ${isSelected && "!text-accent"}`}/>
                        : <LuWrench className={`text-accent4 ${isSelected && "!text-accent"}`}/>}
                </div>
            </div>
        </Link>
    )
}