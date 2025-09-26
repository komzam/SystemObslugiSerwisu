import {ConversationMessage, ConversationMessageProps} from "@/app/Molecules/ConversationMessage";

export type ConversationMessageListProps = {
    messages: ConversationMessageProps[];
}

export function ConversationMessageList({messages}: ConversationMessageListProps) {
    return(
        <div className="flex flex-col w-full gap-3">
            {messages.map((message:ConversationMessageProps, messageIndex:number) => (
                <ConversationMessage key={messageIndex} {...message}/>
            ))}
        </div>
    )
}