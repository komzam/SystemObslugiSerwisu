"use client"

import * as React from "react";
import {ConversationCard} from "@/app/Organisms/ConversationCard";
import {ConversationButtonProps} from "@/app/Molecules/ConversationButton";
import {ConversationMessageProps} from "@/app/Molecules/ConversationMessage";
import {StatusType} from "@/app/Atoms/Status";
import {ConversationListCard} from "@/app/Organisms/ConversationListCard";
import {ConversationList} from "@/app/Molecules/ConversationList";
import {Button} from "@/app/Atoms/Button";
import {LuAlignJustify} from "react-icons/lu";

export default function Messages() {
    const [showConversation, setShowConversation] = React.useState(true);

    const conversations: ConversationButtonProps[] = [
        {date:new Date(Date.parse("2025-09-25T11:00:00.000Z")), title:"Playstation 5", lastMessage:"Ok"},
        {date:new Date(Date.parse("2025-09-25T11:00:00.000Z")), title:"Playstation 5", lastMessage:"Ok"},
        {date:new Date(Date.parse("2025-09-25T11:00:00.000Z")), title:"Playstation 5", lastMessage:"Ok"},
        {date:new Date(Date.parse("2025-09-25T11:00:00.000Z")), title:"Playstation 5", lastMessage:"Ok"},
        {date:new Date(Date.parse("2025-09-25T11:00:00.000Z")), title:"Playstation 5", lastMessage:"Ok"},
        {date:new Date(Date.parse("2025-09-25T11:00:00.000Z")), title:"Playstation 5", lastMessage:"Ok"},
        {date:new Date(Date.parse("2025-09-25T11:00:00.000Z")), title:"Playstation 5", lastMessage:"Ok"},
        {date:new Date(Date.parse("2025-09-25T11:00:00.000Z")), title:"Playstation 5", lastMessage:"Ok"},
        {date:new Date(Date.parse("2025-09-25T11:00:00.000Z")), title:"Playstation 5", lastMessage:"Ok"},
        {date:new Date(Date.parse("2025-09-25T11:00:00.000Z")), title:"Playstation 5", lastMessage:"Ok"}
    ]

    const messages: ConversationMessageProps[] = [
        {message:"How much will it cost?", time: "10:35", type:"sent"},
        {message:"We don’t know how extensive the damage is. We will be able to tell you after the diagnosis.", time: "10:41", type:"received"},
        {message:"Ok", time: "10:43", type:"sent"}
    ]

    return (
        <div className="p-[var(--page-margin)] bg-inherit flex flex-row h-full gap-2 justify-center">
            <ConversationListCard className={`hidden md:flex`} conversations={conversations} />
            {!showConversation && <ConversationListCard className={`w-full md:hidden`} conversations={conversations} />}
            <ConversationCard className={`${!showConversation && "hidden"} md:flex`} title={"Playstation 5"} repairTicketNumber={123456789} messages={messages} status={StatusType.AwaitingConfirmation}/>
        </div>
    );
}
