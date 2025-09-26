"use client"

import {ConversationMessageList} from "@/app/Molecules/ConversationMessageList";
import * as React from "react";
import {ConversationMessageProps} from "@/app/Molecules/ConversationMessage";
import {CardWithHeader} from "@/app/Atoms/CardWithHeader";
import {Button} from "@/app/Atoms/Button";
import {LuAlignJustify, LuWrench} from "react-icons/lu";
import {Status, StatusType} from "@/app/Atoms/Status";
import {TextArea} from "@/app/Atoms/TextArea";
import {useEffect, useRef} from "react";
import {useTranslations} from "next-intl";

export type ConversationCardProps = {
    title: string;
    repairTicketNumber: number;
    status: StatusType;
    messages: ConversationMessageProps[];
    className?: string;
}

export function ConversationCard({title, repairTicketNumber, status, messages, className=""}: ConversationCardProps) {
    const t = useTranslations("Messages");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const element = scrollRef.current;
        if(element){
            element.scrollTop = element.scrollHeight;
        }
    }, [])

    return (
        <CardWithHeader className={`flex flex-col h-full w-[clamp(20rem,calc(100vw-var(--page-margin)*2),75rem)] ${className}`}>
            <CardWithHeader.Header className="flex flex-row gap-2 items-center">
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col md:flex-row gap-2 w-full items-start md:items-center">
                        <div className="flex-1 flex flex-col w-full">
                            <span className="text-larger1 font-bold text-white line-clamp-2 text-ellipsis">{title}</span>
                            <span className="text-accent3">{repairTicketNumber}</span>
                        </div>
                        <div className="flex flex-row-reverse md:flex-row gap-2 sm:gap-5 items-center">
                            <Button inverse={true} variant="secondary" icon={<LuWrench size="1.5rem"/>}>{t("details")}</Button>
                            <Status type={status}/>
                        </div>
                    </div>
                </div>
            </CardWithHeader.Header>
            <CardWithHeader.Card ref={scrollRef} className="flex-1 !rounded-b-none overflow-y-scroll no-scrollbar">
                <ConversationMessageList messages={messages}/>
            </CardWithHeader.Card>
            <div className="bg-accent2 flex flex-row px-2 py-3 gap-5 w-full rounded-b-xl">
                <TextArea placeholder={t("messagePlaceholder")} rows={2} className="flex-1 w-full"/>
                <Button>{t("send")}</Button>
            </div>
        </CardWithHeader>
    )
}