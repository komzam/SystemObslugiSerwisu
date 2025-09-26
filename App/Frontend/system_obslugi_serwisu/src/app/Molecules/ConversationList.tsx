import {ConversationButton, ConversationButtonProps} from "@/app/Molecules/ConversationButton";
import * as React from "react";

export type ConversationListProps = {
    conversations: ConversationButtonProps[];
    className?: string;
}

export function ConversationList({conversations, className=""}: ConversationListProps) {
    return(
        <div className={`flex flex-col gap-3 ${className}`}>
            {conversations.map((conversation:ConversationButtonProps, conversationNumber: number) => (
                <ConversationButton key={conversationNumber} {...conversation}/>
            ))}
        </div>
    )
}