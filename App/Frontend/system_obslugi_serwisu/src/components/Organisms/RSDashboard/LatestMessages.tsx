import {Card} from "@/components/Atoms/Card";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

export type LatestConversationDto = {
    id: string;
    title: string;
    lastMessage: string;
    lastMessageDate: Date;
}

export type LatestMessagesProps = {
    conversations: LatestConversationDto[];
    className?: string;
}

export default function LatestMessages({conversations, className=""} : LatestMessagesProps){
    const t = useTranslations("Dashboard.LatestMessages");

    return (
        <Card className={className}>
            <p className="text-larger1 font-bold">{t("title")}</p>
            <div className="flex flex-col gap-2">
                {conversations.map((conversation, conversationIndex) => (
                    conversationIndex < 3 &&
                    <Link href={`/messages/${conversation.id}`} key={conversationIndex}>
                        <div className="flex flex-row gap-1 p-2 rounded-md hover:bg-accent2">
                            <div className="flex-1 flex flex-col ">
                                <p className="text-larger2 font-bold line-clamp-1">{conversation.title}</p>
                                <p className="line-clamp-1">{conversation.lastMessage}</p>
                            </div>
                            <p>{conversation.lastMessageDate.toLocaleTimeString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
}