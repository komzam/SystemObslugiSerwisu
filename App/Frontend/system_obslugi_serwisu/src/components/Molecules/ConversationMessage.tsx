export type ConversationMessageProps = {
    type: "sent" | "received";
    message: string;
    time: string;
}

export function ConversationMessage({type, message, time}: ConversationMessageProps) {
    return(
        <div className={`flex flex-col w-full ${type=="sent" && "items-end"} ${type=="received" && "items-start"}`}>
            <div className={`flex flex-col gap-1 w-fit px-2.5 py-3 rounded-t-xl ${type=="sent" && "bg-primary text-white rounded-s-xl"} ${type=="received" && "bg-accent3 rounded-e-xl"}`}>
                <p className={`${type=="sent" && "text-right"} ${type=="received" && "text-left"}`}>{message}</p>
                <p className={`text-smaller2 ${type=="sent" && "text-right"} ${type=="received" && "text-left"}`}>{time}</p>
            </div>
        </div>
    )
}