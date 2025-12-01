"use client"

import {ConversationMessageList} from "@/components/Molecules/ConversationMessageList";
import * as React from "react";
import {ConversationMessageProps} from "@/components/Molecules/ConversationMessage";
import {CardWithHeader} from "@/components/Atoms/CardWithHeader";
import {Button} from "@/components/Atoms/Button";
import {LuChevronLeft, LuWrench} from "react-icons/lu";
import {TextArea} from "@/components/Atoms/TextArea";
import {useLayoutEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {ConversationType, RepairStatus} from "@/__generated__/types";
import * as RepairShopElementInfo from "@/components/Molecules/RepairShopElementInfo";
import {Link} from "@/i18n/navigation";
import {RepairStatusC} from "@/components/Molecules/RepairStatus";

export type ConversationCardProps = {
    conversationType: ConversationType.RepairChat
    title: string;
    repairId: string;
    repairTicketNumber: string;
    status: RepairStatus;
    messages: ConversationMessageProps[];
    className?: string;
    onMessageSendAction: (message: string) => Promise<boolean>;
    onLoadMoreAction: () => Promise<void>;
}|{
    conversationType: ConversationType.GeneralChat
    title: string;
    rating?: number;
    reviewCount?: number;
    messages: ConversationMessageProps[];
    className?: string;
    onMessageSendAction: (message: string) => Promise<boolean>;
    onLoadMoreAction?: () => Promise<void>;
}

export function ConversationCard(props: ConversationCardProps) {
    const t = useTranslations("Messages");
    const scrollRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState<string>("");
    const shouldStickToBottom = useRef(true);
    const prevScrollHeightRef = useRef<number | null>(null);
    const prevScrollTopRef = useRef<number | null>(null);

    useLayoutEffect(()=>{
        const element = scrollRef.current;
        if(!element) return;

        if (prevScrollHeightRef.current !== null && prevScrollTopRef.current !== null) {
            const newScrollHeight = element.scrollHeight;
            const heightDifference = newScrollHeight - prevScrollHeightRef.current;

            element.scrollTop = prevScrollTopRef.current + heightDifference;

            prevScrollHeightRef.current = null;
            prevScrollTopRef.current = null;
        }

        if(shouldStickToBottom.current){
            element.scrollTop = element.scrollHeight;
        }
    }, [props.messages])

    const sendMessage = async () => {
        if(!message)
            return;

        const sent = await props.onMessageSendAction(message);

        if(sent) {
            shouldStickToBottom.current = true;
            setMessage("");
        }
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            await sendMessage();
        }
    };

    const handleScroll = async () => {
        const el = scrollRef.current;
        if (!el) return;

        shouldStickToBottom.current =
            el.scrollHeight - el.scrollTop - el.clientHeight < 50;


        if (el.scrollTop < 50) {
            prevScrollTopRef.current = el.scrollTop;
            if (prevScrollHeightRef.current !== null) return;

            prevScrollHeightRef.current = el.scrollHeight;

            if(props.onLoadMoreAction) await props.onLoadMoreAction();
        }
    };

    return (
        <CardWithHeader className={`flex flex-col w-full h-full ${props.className}`}>
            <CardWithHeader.Header className="flex flex-row gap-2 items-center">
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col md:flex-row gap-2 w-full items-start md:items-center">
                        <div className="flex flex-1 flex-row items-center gap-3">
                            <Link href="/messages"><LuChevronLeft className="md:hidden text-accent3" size="40"/></Link>
                            <div className="flex-1 flex flex-col w-full">
                                <span className="text-larger1 font-bold text-white line-clamp-2 text-ellipsis">{props.title}</span>
                                {props.conversationType === ConversationType.RepairChat ? (
                                    <span className="text-accent3">{props.repairTicketNumber}</span>
                                ) :
                                    props.rating != undefined && props.reviewCount != undefined && (
                                    <RepairShopElementInfo.RatingRoot>
                                        <RepairShopElementInfo.RatingStars numberOfStars={props.rating}/>
                                        <RepairShopElementInfo.RatingSeparator/>
                                        <RepairShopElementInfo.RatingReviews numberOfReviews={props.reviewCount}/>
                                    </RepairShopElementInfo.RatingRoot>
                                )}
                            </div>
                        </div>
                        { props.conversationType === ConversationType.RepairChat &&
                            <div className="flex flex-row-reverse md:flex-row gap-2 sm:gap-5 items-center">
                                <Link href={`/repair/${props.repairId}`}><Button inverse={true} variant="secondary" icon={<LuWrench size="1.5rem"/>}>{t("details")}</Button></Link>
                                <RepairStatusC type={props.status}/>
                            </div>
                        }
                    </div>
                </div>
            </CardWithHeader.Header>
            <CardWithHeader.Card ref={scrollRef} onScroll={handleScroll} className="flex-1 !rounded-b-none overflow-y-scroll no-scrollbar">
                <ConversationMessageList messages={props.messages}/>
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