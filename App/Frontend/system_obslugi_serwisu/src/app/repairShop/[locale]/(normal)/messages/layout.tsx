"use client"

import {ReactNode, useEffect, useMemo, useState} from "react";
import {ConversationListCard} from "@/components/Organisms/ConversationListCard";
import * as React from "react";
import {useParams} from "next/navigation";
import {ProtectedRoute} from "@/components/Utils/ProtectedRoute";
import {usePathname} from "@/i18n/navigation";
import {ConversationButtonProps} from "@/components/Molecules/ConversationButton";
import {useQuery, useSubscription} from "@apollo/client/react";
import {
    ConversationType,
    GetConversationsQuery,
    GetConversationsQueryVariables, RepairShopConvListSubscriptionSubscription,
    RepairShopConvListSubscriptionSubscriptionVariables
} from "@/__generated__/types";
import {GET_CONVERSATIONS} from "@/graphql/GetConversations";
import {REPAIRSHOP_CONV_LIST_SUB} from "@/graphql/RepairShopConvListSubscription";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {ErrorName} from "@/components/Utils/ErrorName";
import {useTranslations} from "next-intl";
import {useToast} from "@/components/Utils/ToastNotifications";


type MessagesLayoutParams = {
    children: ReactNode;
}

export default function MessagesLayout({children}: MessagesLayoutParams) {
    const params = useParams<{id?: string}>();
    const path = usePathname();
    const conversationId = params.id;
    const showList = !conversationId && path!="/messages/new";
    const tErr = useTranslations("Errors");
    const toasts = useToast();
    const [conversations, setConversations] = useState<ConversationButtonProps[]>([]);
    const [noMoreConversations, setNoMoreConversations] = useState<boolean>(false);
    const authContext = useAuthContext();
    const repairShopId:string = authContext.authInfo?.__typename=="FullWorkerDto" ? authContext.authInfo.repairShop?.id??"" : "";

    const { data: queryData, loading: queryLoading, fetchMore } = useQuery<GetConversationsQuery, GetConversationsQueryVariables>(GET_CONVERSATIONS,
        {
            variables:
                {
                    numberOfConversations: 10,
                    lastConversationId: null
                }
        }
    );

    useSubscription<RepairShopConvListSubscriptionSubscription,
                    RepairShopConvListSubscriptionSubscriptionVariables>(REPAIRSHOP_CONV_LIST_SUB, {variables:{repairShopId}});

    useEffect(() => {
        if(queryData?.me.__typename == "FullWorkerDto") // Temp fix
            if (!queryLoading && queryData?.me.repairShop?.conversations.items) {
                const initial = queryData.me.repairShop.conversations.items.map((c) => ({
                    id: c.id,
                    type: c.conversationType == ConversationType.RepairChat? "repair": "general" as "repair"|"general",
                    date: new Date(Date.parse(c.messages.items[0]?.createdAt)),
                    title: c.conversationType==ConversationType.GeneralChat? c.customer?.name??"": (c.repair?.deviceInfo.manufacturer ?? "") + " " + (c.repair?.deviceInfo.model ?? ""),
                    lastMessage: c.messages.items[0]?.content,
                    isSelected: conversationId != null && c.id == conversationId
                }));

                setNoMoreConversations(!queryData.me.repairShop.conversations.hasMore);

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
        if(queryData?.me.__typename == "FullWorkerDto") {
            try {
                fetchMore({variables: {lastConversationId: queryData?.me.repairShop?.conversations.lastItemId}});
            }catch(err) {
                toasts.toast({title:tErr("error"), type:"error", description:ErrorName(err, tErr)});
            }
        }
    }


    return (
        <ProtectedRoute>
            <div className="bg-inherit flex flex-row h-[calc(100vh-3rem-2*var(--page-margin))] gap-2 justify-center w-[clamp(20rem,calc(100vw-var(--page-margin)*2),95rem)]">
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