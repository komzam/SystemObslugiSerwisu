"use client"

import {ReactNode} from "react";
import {ConversationListCard} from "@/app/Organisms/ConversationListCard";
import * as React from "react";
import {useParams} from "next/navigation";


type MessagesLayoutParams = {
    children: ReactNode;
}

export default function MessagesLayout({children}: MessagesLayoutParams) {
    const params = useParams<{id?: string}>();
    const conversationId = params.id;

    return (
        <div className="bg-inherit flex flex-row h-full gap-2 justify-center w-[clamp(20rem,calc(100vw-var(--page-margin)*2),95rem)]">
            <ConversationListCard
                className={`${conversationId ? 'hidden' : 'flex'} w-full md:flex md:basis-[21%]`}
                conversationId = {conversationId}
            />
            {children}
        </div>
    );
}