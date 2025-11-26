import {Card} from "@/app/Atoms/Card";
import {useTranslations} from "next-intl";

export default function Messages() {
    const t = useTranslations("Messages");

    return (
        <Card className={`bg-accent3 hidden !p-4 w-full md:flex md:basis-[79%] md:flex-col md:items-center md:justify-center`}>
            <p className={"text-larger1 font-bold text-accent4"}>{t("selectConversation")}</p>
        </Card>
    );
}
