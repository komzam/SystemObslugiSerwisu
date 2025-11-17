"use client"

import {ConversationMessageList} from "@/app/Molecules/ConversationMessageList";
import * as React from "react";
import {ConversationMessageProps} from "@/app/Molecules/ConversationMessage";
import {CardWithHeader} from "@/app/Atoms/CardWithHeader";
import {Button} from "@/app/Atoms/Button";
import {LuWrench} from "react-icons/lu";
import {Status} from "@/app/Atoms/Status";
import {TextArea} from "@/app/Atoms/TextArea";
import {useEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {RepairStatus} from "@/__generated__/types";
import {Message} from "postcss";
import {useDebounce} from "@/app/Hooks/useDebounce";

export type ConversationCardProps = {
    title: string;
    repairTicketNumber: number;
    status: RepairStatus;
    messages: ConversationMessageProps[];
    className?: string;
    onMessageSendAction: (message: string) => Promise<boolean>;
}

export function ConversationCard({title, repairTicketNumber, status, messages, className="", onMessageSendAction}: ConversationCardProps) {
    const t = useTranslations("Messages");
    const scrollRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState<string>("");

    useEffect(()=>{
        const element = scrollRef.current;
        if(element){
            element.scrollTop = element.scrollHeight;
        }
    }, [messages])

    const sendMessage = async () => {
        if(!message)
            return;

        const sent = await onMessageSendAction(message);

        if(sent)
            setMessage("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <CardWithHeader className={`flex flex-col w-full h-full ${className}`}>
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
                <TextArea value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder={t("messagePlaceholder")}
                          rows={2}
                          className="flex-1 w-full"/>
                <Button onClick={sendMessage}>{t("send")}</Button>
            </div>
        </CardWithHeader>
    )
}