"use client"

import {ConversationMessageProps} from "@/app/Molecules/ConversationMessage";
import {ConversationCard} from "@/app/Organisms/ConversationCard";
import {
    ActingRole, ConversationSubscriptionSubscription, ConversationSubscriptionSubscriptionVariables,
    GetConversationQuery, GetConversationQueryVariables,
    RepairStatus, SenderRole, SendMessageMutation, SendMessageMutationVariables
} from "@/__generated__/types";
import * as React from "react";
import {useParams} from "next/navigation";
import {useMutation, useQuery, useSubscription} from "@apollo/client/react";
import {GET_CONVERSATION} from "@/graphql/GetConversation";
import {DateTime} from "luxon";
import {CONVERSATION_SUBSCRIPTION} from "@/graphql/ConversationSubscription";
import {useEffect, useState} from "react";
import {SEND_MESSAGE} from "@/graphql/SendMessage";

export default function Messages() {
    const params = useParams();
    const conversationId = params.id;
    const [messages, setMessages] = useState<ConversationMessageProps[]>([]);

    const { data: queryData, loading: queryLoading } = useQuery<GetConversationQuery, GetConversationQueryVariables>(
        GET_CONVERSATION,
        {
            variables: {
                conversationId,
                actingRole: ActingRole.Customer
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


    return (
        <ConversationCard className={`${false && "hidden"} md:flex md:flex-75`}
                          title={"Playstation 5"}
                          repairTicketNumber={123456789}
                          messages={messages}
                          status={RepairStatus.AwaitingDelivery}
                          onMessageSendAction={onMessageSend}
        />
    );
}