"use client"

import * as React from "react";
import {ConversationCard} from "@/app/Organisms/ConversationCard";
import {ConversationMessageProps} from "@/app/Molecules/ConversationMessage";
import {
    RepairStatus
} from "@/__generated__/types";

export default function Messages() {

    const messages: ConversationMessageProps[] = [
        {message:"How much will it cost?", time: "10:35", type:"sent"},
        {message:"We don’t know how extensive the damage is. We will be able to tell you after the diagnosis.", time: "10:41", type:"received"},
        {message:"Ok", time: "10:43", type:"sent"}
    ]

    return (
        <ConversationCard className={`${false && "hidden"} md:flex md:flex-75`} title={"Playstation 5"} repairTicketNumber={123456789} messages={messages} status={RepairStatus.AwaitingDelivery}/>
    );
}
