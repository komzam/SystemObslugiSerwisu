"use client"

import {ReactNode} from "react";
import {ConversationListCard} from "@/app/Organisms/ConversationListCard";
import {
    GetCustomerConversationsQuery,
    GetCustomerConversationsQueryVariables,
} from "@/__generated__/types";
import * as React from "react";
import {useQuery} from "@apollo/client/react";
import {GET_CUSTOMER_CONVERSATIONS} from "@/graphql/GetCustomerConversations";
import {ConversationButtonProps} from "@/app/Molecules/ConversationButton";
import {useParams} from "next/navigation";

export default function MessagesLayout({ children, }: Readonly<{ children: ReactNode; }>) {
    const params = useParams();
    const conversationId = params.id;
    const [showConversation, setShowConversation] = React.useState(true);
    const conversationListRequest = useQuery<GetCustomerConversationsQuery, GetCustomerConversationsQueryVariables>(GET_CUSTOMER_CONVERSATIONS,
        {variables:{
                numberOfConversations: 10
            }})


    const conversations: ConversationButtonProps[] = []

    const conversationList = conversationListRequest?.data?.me.conversations.items;

    if(conversationList) {
        for (const conversation of conversationList) {
            conversations.push({
                id: conversation.id,
                date: new Date(Date.parse(conversation.modifiedAt)),
                title: conversation.repairShop.name,
                lastMessage: conversation.messages.items[0].content,
                isSelected: conversationId != null && conversation.id == conversationId
            });
        }
    }

    return (
        <div className="bg-inherit flex flex-row h-full gap-2 justify-center w-[clamp(20rem,calc(100vw-var(--page-margin)*2),95rem)]">
            <ConversationListCard
                className={`${showConversation ? 'hidden' : 'flex'} w-full md:flex md:flex-20 md:w-auto`}
                conversations={conversations}
            />
            {children}
        </div>
    );
}