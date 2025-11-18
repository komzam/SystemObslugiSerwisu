"use client"

import {Card} from "@/app/Atoms/Card";
import {useTranslations} from "next-intl";
import {ConversationButtonProps} from "@/app/Molecules/ConversationButton";
import * as React from "react";
import {ConversationList} from "@/app/Molecules/ConversationList";
import {useEffect, useRef, useState} from "react";
import {useQuery} from "@apollo/client/react";
import {
    ConversationType,
    GetCustomerConversationsQuery,
    GetCustomerConversationsQueryVariables
} from "@/__generated__/types";
import {GET_CUSTOMER_CONVERSATIONS} from "@/graphql/GetCustomerConversations";

export type ConversationListProps = {
    conversationId: string | undefined;
    className?: string;
}

export function ConversationListCard({conversationId, className}: ConversationListProps) {
    const t = useTranslations("Messages");
    const scrollRef = useRef<HTMLDivElement>(null);
    const [conversations, setConversations] = useState<ConversationButtonProps[]>([]);
    const [noMoreConversations, setNoMoreConversations] = useState<boolean>(false);
    const { data: queryData, loading: queryLoading, fetchMore } = useQuery<GetCustomerConversationsQuery, GetCustomerConversationsQueryVariables>(GET_CUSTOMER_CONVERSATIONS,
        {
            variables:
            {
                numberOfConversations: 10,
                lastConversationId: null
            }
        }
    );

    useEffect(() => {
        if (!queryLoading && queryData?.me.conversations.items) {
            const initial = queryData.me.conversations.items.map((c) => ({
                id: c.id,
                type: c.conversationType == ConversationType.RepairChat? "repair": "general" as "repair"|"general",
                date: new Date(Date.parse(c.messages.items[0]?.createdAt)),
                title: c.conversationType==ConversationType.GeneralChat? c.repairShop.name: (c.repair?.deviceInfo.manufacturer ?? "") + " " + (c.repair?.deviceInfo.model ?? ""),
                lastMessage: c.messages.items[0]?.content,
                isSelected: conversationId != null && c.id == conversationId
            }));

            setNoMoreConversations(!queryData.me.conversations.hasMore);

            setConversations(initial);
        }
    }, [queryLoading, queryData, conversationId]);

    const onLoadMore = async () => {
        if(noMoreConversations) return;
        fetchMore({variables: {lastConversationId: queryData?.me.conversations.lastItemId}});
    }

    const handleScroll = async () => {
        const el = scrollRef.current;
        if (!el) return;

        if (el.scrollHeight - (el.scrollTop + el.clientHeight) < 50 && !queryLoading) {
            await onLoadMore();
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