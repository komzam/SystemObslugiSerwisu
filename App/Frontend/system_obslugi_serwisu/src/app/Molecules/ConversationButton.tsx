import {useFormatter} from "next-intl";

export type ConversationButtonProps = {
    title: string;
    date: Date;
    lastMessage: string;
    isSelected?: boolean;
};

export function ConversationButton({title, date, lastMessage, isSelected=false}: ConversationButtonProps) {
    const format = useFormatter();
    return (
        <div className={`flex flex-col px-2 py-5 shadow-md gap-4 rounded-xl w-full ${isSelected? "bg-secondary": "bg-white hover:bg-accent2"}`}>
            <div className="flex flex-row gap-2">
                <span className="flex-1 font-bold whitespace-nowrap">{title}</span>
                <span className="text-smaller2 text-accent4">{format.relativeTime(date, Date.now())}</span>
            </div>
            <p className="line-clamp-1 text-ellipsis">{lastMessage}</p>
        </div>
    )
}