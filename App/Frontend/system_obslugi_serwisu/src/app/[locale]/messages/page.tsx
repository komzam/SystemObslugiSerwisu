"use client"

import * as React from "react";
import {ConversationCard} from "@/app/Organisms/ConversationCard";
import {ConversationButtonProps} from "@/app/Molecules/ConversationButton";
import {ConversationMessageProps} from "@/app/Molecules/ConversationMessage";
import {ConversationListCard} from "@/app/Organisms/ConversationListCard";
import {
    GetCustomerConversationsQuery,
    GetCustomerConversationsQueryVariables,
    RepairStatus
} from "@/__generated__/types";
import {useQuery} from "@apollo/client/react";
import {GET_CUSTOMER_CONVERSATIONS} from "@/graphql/GetCustomerConversations";

export default function Messages() {
    const [showConversation, setShowConversation] = React.useState(true);
    const conversationListRequest = useQuery<GetCustomerConversationsQuery, GetCustomerConversationsQueryVariables>(GET_CUSTOMER_CONVERSATIONS,
        {variables:{
            numberOfConversations: 10
        }})


    const conversations: ConversationButtonProps[] = []

    var conversationList = conversationListRequest?.data?.me.conversations.items;

    if(conversationList) {
        for (let conversation of conversationList) {
            console.log(conversation);
            conversations.push({
                date: new Date(Date.parse(conversation.modifiedAt)),
                title: conversation.repairShop.name,
                lastMessage: conversation.messages.items[0].content
            });
        }
    }



    const messages: ConversationMessageProps[] = [
        {message:"How much will it cost?", time: "10:35", type:"sent"},
        {message:"We don’t know how extensive the damage is. We will be able to tell you after the diagnosis.", time: "10:41", type:"received"},
        {message:"Ok", time: "10:43", type:"sent"}
    ]

    return (
        <div className="bg-inherit flex flex-row h-full gap-2 justify-center">
            <ConversationListCard className={`hidden md:flex`} conversations={conversations} />
            {!showConversation && <ConversationListCard className={`w-full md:hidden`} conversations={conversations} />}
            <ConversationCard className={`${!showConversation && "hidden"} md:flex`} title={"Playstation 5"} repairTicketNumber={123456789} messages={messages} status={RepairStatus.AwaitingDelivery}/>
        </div>
    );
}
