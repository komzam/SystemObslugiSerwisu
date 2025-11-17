import {Card} from "@/app/Atoms/Card";
import {useTranslations} from "next-intl";
import {ConversationButtonProps} from "@/app/Molecules/ConversationButton";
import * as React from "react";
import {ConversationList} from "@/app/Molecules/ConversationList";

export type ConversationListProps = {
    conversations: ConversationButtonProps[];
    className?: string;
}

export function ConversationListCard({conversations, className}: ConversationListProps) {
    const t = useTranslations("Messages")
    return(
        <Card className={`flex flex-col w-full h-full ${className}`}>
            <Card.Label>{t("conversations")}</Card.Label>
            <div className={"flex-1 overflow-y-scroll no-scrollbar"}>
                <ConversationList className="h-full" conversations={conversations}/>
            </div>
        </Card>
    )
}