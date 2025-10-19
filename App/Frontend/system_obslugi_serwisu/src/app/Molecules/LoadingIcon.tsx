import {LuWrench} from "react-icons/lu";
import {useTranslations} from "next-intl";

export function LoadingIcon(){
    const t = useTranslations("Common");

    return (
        <div className="flex flex-col items-center animate-bounce mt-5">
            <LuWrench size="48px" className="text-primary"/>
            <p className="font-bold text-primary">{t("loading").toUpperCase()}</p>
        </div>
    )
}