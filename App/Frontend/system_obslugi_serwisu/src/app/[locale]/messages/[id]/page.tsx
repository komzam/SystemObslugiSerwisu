"use client"

import {ConversationMessageProps} from "@/app/Molecules/ConversationMessage";
import {ConversationCard} from "@/app/Organisms/ConversationCard";
import {
    ActingRole, ConversationSubscriptionSubscription, ConversationSubscriptionSubscriptionVariables, ConversationType,
    GetConversationQuery, GetConversationQueryVariables,
    RepairStatus, SenderRole, SendMessageMutation, SendMessageMutationVariables
} from "@/__generated__/types";
import * as React from "react";
import {useParams} from "next/navigation";
import {useApolloClient, useMutation, useQuery, useSubscription} from "@apollo/client/react";
import {GET_CONVERSATION, GET_MORE_MESSAGES} from "@/graphql/GetConversation";
import {DateTime} from "luxon";
import {CONVERSATION_SUBSCRIPTION} from "@/graphql/ConversationSubscription";
import {useEffect, useState} from "react";
import {SEND_MESSAGE} from "@/graphql/SendMessage";
import {Card} from "@/app/Atoms/Card";

export default function Messages() {
    const params = useParams();
    const conversationId = params.id;
    const [messages, setMessages] = useState<ConversationMessageProps[]>([]);
    const [noMoreMessages, setNoMoreMessages] = useState<boolean>(false);

    const { data: queryData, loading: queryLoading, fetchMore } = useQuery<GetConversationQuery, GetConversationQueryVariables>(
        GET_CONVERSATION,
        {
            variables: {
                conversationId,
                actingRole: ActingRole.Customer,
                numberOfMessages: 10,
                lastMessageId: null
            }
        }
    );

    const [sendMessage] = useMutation<SendMessageMutation, SendMessageMutationVariables>(SEND_MESSAGE);

    useSubscription<ConversationSubscriptionSubscription, ConversationSubscriptionSubscriptionVariables>(CONVERSATION_SUBSCRIPTION, {
        variables: { conversationId, actingRole: ActingRole.Customer },

        onData: ({ data }) => {
            const incoming = data?.data?.onMessageSent;
            if (!incoming) return;

            const newMessage = {
                message: incoming.content,
                time: DateTime.fromISO(incoming.createdAt)
                    .toLocal()
                    .toFormat("HH:mm"),
                type: (incoming.senderRole === SenderRole.Customer ? "sent" : "received") as "sent" | "received"
            };

            setMessages((prev) => [newMessage, ...prev]);
        }
    });

    useEffect(() => {
        if (!queryLoading && queryData?.conversation.messages.items) {
            const initial = queryData.conversation.messages.items.map((m) => ({
                message: m.content,
                time: DateTime.fromISO(m.createdAt)
                    .toLocal()
                    .toFormat("HH:mm"),
                type: (m.senderRole === SenderRole.Customer ? "sent" : "received") as "sent" | "received"
            }));

            setNoMoreMessages(!queryData.conversation.messages.hasMore);

            setMessages(initial);
        }
    }, [queryLoading, queryData]);

    const onMessageSend = async (message: string): Promise<boolean> =>{
        try{
            await sendMessage({variables:{conversationId, actingRole: ActingRole.Customer, message}})
        }catch{
            return false;
        }
        return true;
    };

    const onLoadMore = async () => {
        if(noMoreMessages) return;
        fetchMore({query: GET_MORE_MESSAGES,
            variables: {conversationId, lastMessageId: queryData?.conversation.messages.lastItemId, actingRole: ActingRole.Customer, numberOfMessages: 10},
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;

                return {
                    conversation: {
                        ...prev.conversation,
                        messages: {
                            items: [...prev.conversation.messages.items, ...fetchMoreResult.conversation.messages.items],
                            lastItemId: fetchMoreResult.conversation.messages.lastItemId,
                            hasMore: fetchMoreResult.conversation.messages.hasMore
                        }
                    }
                };
            }});
    }

    if(!queryData) return <Card className={`bg-accent3 hidden !p-4 w-full md:flex md:basis-[79%] md:flex-col md:items-center md:justify-center`}/>;

    return (
        <>
            {queryData?.conversation.conversationType === ConversationType.RepairChat ?
                <ConversationCard className={`md:flex md:basis-[79%]`}
                                  conversationType={queryData?.conversation.conversationType}
                                  title={(queryData?.conversation?.repair?.deviceInfo.manufacturer ?? "") + " " + (queryData?.conversation?.repair?.deviceInfo.model ?? "")}
                                  repairTicketNumber={queryData?.conversation?.repair?.id ?? ""}
                                  messages={messages}
                                  status={queryData?.conversation?.repair?.status ?? RepairStatus.Created}
                                  onMessageSendAction={onMessageSend}
                                  onLoadMoreAction={onLoadMore}
                />
                :
                <ConversationCard className={`md:flex md:basis-[79%]`}
                                  conversationType={queryData?.conversation.conversationType}
                                  title={queryData?.conversation.repairShop?.name ?? ""}
                                  rating={queryData?.conversation.repairShop?.rating ?? 0}
                                  reviewCount={queryData?.conversation.repairShop?.reviewCount?? 0}
                                  messages={messages}
                                  onMessageSendAction={onMessageSend}
                                  onLoadMoreAction={onLoadMore}
                />
            }
        </>
    );
}