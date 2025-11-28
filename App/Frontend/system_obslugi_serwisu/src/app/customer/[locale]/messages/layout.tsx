"use client"

import {ReactNode, useEffect, useMemo, useState} from "react";
import {ConversationListCard} from "@/components/Organisms/ConversationListCard";
import * as React from "react";
import {useParams} from "next/navigation";
import {ProtectedRoute} from "@/components/Utils/ProtectedRoute";
import {usePathname} from "@/i18n/navigation";
import {useQuery, useSubscription} from "@apollo/client/react";
import {
    ConversationType,
    CustomerConvListSubscriptionSubscription, CustomerConvListSubscriptionSubscriptionVariables,
    GetConversationsQuery,
    GetConversationsQueryVariables
} from "@/__generated__/types";
import {GET_CONVERSATIONS} from "@/graphql/GetConversations";
import {CUSTOMER_CONV_LIST_SUB} from "@/graphql/CustomerConvListSubscription";
import {ConversationButtonProps} from "@/components/Molecules/ConversationButton";


type MessagesLayoutParams = {
    children: ReactNode;
}

export default function MessagesLayout({children}: MessagesLayoutParams) {
    const params = useParams<{id?: string}>();
    const path = usePathname();
    const conversationId = params.id;
    const showList = !conversationId && path!="/messages/new"
    const [conversations, setConversations] = useState<ConversationButtonProps[]>([]);
    const [noMoreConversations, setNoMoreConversations] = useState<boolean>(false);

    const { data: queryData, loading: queryLoading, fetchMore } = useQuery<GetConversationsQuery, GetConversationsQueryVariables>(GET_CONVERSATIONS,
        {
            variables:
                {
                    numberOfConversations: 10,
                    lastConversationId: null
                }
        }
    );

    useSubscription<CustomerConvListSubscriptionSubscription, CustomerConvListSubscriptionSubscriptionVariables>(CUSTOMER_CONV_LIST_SUB);

    useEffect(() => {
        if(queryData?.me.__typename == "FullCustomerDto") // Temp fix
            if (!queryLoading && queryData?.me.conversations.items) {
                const initial = queryData.me.conversations.items.map((c) => ({
                    id: c.id,
                    type: c.conversationType == ConversationType.RepairChat? "repair": "general" as "repair"|"general",
                    date: new Date(Date.parse(c.messages.items[0]?.createdAt)),
                    title: c.conversationType==ConversationType.GeneralChat? c.repairShop?.name??"": (c.repair?.deviceInfo.manufacturer ?? "") + " " + (c.repair?.deviceInfo.model ?? ""),
                    lastMessage: c.messages.items[0]?.content,
                    isSelected: conversationId != null && c.id == conversationId
                }));

                setNoMoreConversations(!queryData.me.conversations.hasMore);

                setConversations(initial);
            }
    }, [queryLoading, queryData, conversationId]);

    const sortedConversations = useMemo(() => {
        const copy = [...conversations];

        return copy.sort((a, b) => {
            const dateA = new Date(a.date || 0);
            const dateB = new Date(b.date || 0);

            return dateB.getTime() - dateA.getTime();
        });

    }, [conversations]);

    const onLoadMore = async () => {
        if(queryLoading) return;
        if(noMoreConversations) return;
        if(queryData?.me.__typename == "FullCustomerDto") // Temp fix
            fetchMore({variables: {lastConversationId: queryData?.me.conversations.lastItemId}});
    }

    return (
        <ProtectedRoute>
            <div className="bg-inherit flex flex-row h-[calc(100vh-4rem-2*var(--page-margin))] gap-2 justify-center w-[clamp(20rem,calc(100vw-var(--page-margin)*2),95rem)]">
                <ConversationListCard
                    className={`${showList ? 'flex' : 'hidden'} w-full md:flex md:basis-[21%]`}
                    conversations = {sortedConversations}
                    onLoadMoreAction={onLoadMore}
                />
                {children}
            </div>
        </ProtectedRoute>
    );
}