"use client"

import {ReactNode} from "react";
import {ConversationListCard} from "@/app/Organisms/ConversationListCard";
import * as React from "react";
import {useParams} from "next/navigation";
import {ProtectedRoute} from "@/app/Utils/ProtectedRoute";
import {usePathname} from "@/i18n/navigation";


type MessagesLayoutParams = {
    children: ReactNode;
}

export default function MessagesLayout({children}: MessagesLayoutParams) {
    const params = useParams<{id?: string}>();
    const path = usePathname();
    const conversationId = params.id;
    const showList = !conversationId && path!="/messages/new"

    return (
        <ProtectedRoute>
            <div className="bg-inherit flex flex-row h-[calc(100vh-4rem-2*var(--page-margin))] gap-2 justify-center w-[clamp(20rem,calc(100vw-var(--page-margin)*2),95rem)]">
                <ConversationListCard
                    className={`${showList ? 'flex' : 'hidden'} w-full md:flex md:basis-[21%]`}
                    conversationId = {conversationId}
                />
                {children}
            </div>
        </ProtectedRoute>
    );
}