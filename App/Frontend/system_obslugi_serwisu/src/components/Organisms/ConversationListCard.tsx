"use client"

import {Card} from "@/components/Atoms/Card";
import {useTranslations} from "next-intl";
import {ConversationButtonProps} from "@/components/Molecules/ConversationButton";
import * as React from "react";
import {ConversationList} from "@/components/Molecules/ConversationList";
import { useRef } from "react";

export type ConversationListProps = {
    conversations: ConversationButtonProps[];
    onLoadMoreAction: () => Promise<void>;
    className?: string;
}

export function ConversationListCard({conversations, onLoadMoreAction, className}: ConversationListProps) {
    const t = useTranslations("Messages");
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = async () => {
        const el = scrollRef.current;
        if (!el) return;

        if (el.scrollHeight - (el.scrollTop + el.clientHeight) < 50) {
            await onLoadMoreAction();
        }
    };

    return(
        <Card className={`flex flex-col w-full h-full px-4 ${className}`}>
            <Card.Label className="px-3">{t("conversations")}</Card.Label>
            <div ref={scrollRef} onScroll={handleScroll} className={"flex-1 overflow-y-scroll no-scrollbar px-3 py-1"}>
                <ConversationList conversations={conversations}/>
            </div>
        </Card>
    )
}