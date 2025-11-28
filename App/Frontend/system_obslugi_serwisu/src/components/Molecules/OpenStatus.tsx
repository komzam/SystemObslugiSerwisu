import {useTranslations} from "next-intl";
import {TextWithDot} from "@/components/Atoms/TextWithDot";

export type OpenStatusProps = {
    className?: string;
    isOpen: boolean;
}

export function OpenStatus({className="", isOpen}: OpenStatusProps) {
    const t = useTranslations("RepairShop");

    return (
        <>
            {isOpen && <TextWithDot className={`text-green-600 font-bold ${className}`}>{t("open")}</TextWithDot>}
            {!isOpen && <TextWithDot className={`text-red-600 font-bold ${className}`}>{t("closed")}</TextWithDot>}
        </>
    )
}