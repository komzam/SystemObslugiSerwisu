import {useTranslations} from "next-intl";
import {RepairStatus} from "@/__generated__/types";

type StatusVariant = {
    dot: string;
    background: string;
    text: string;
}

const variants: Record<string, StatusVariant> = {
    yellow: {
        dot: "bg-yellow-300",
        background: "bg-yellow-100",
        text: "text-yellow-700"
    },
    blue: {
        dot: "bg-blue-300",
        background: "bg-blue-100",
        text: "text-blue-700"
    },
    red: {
        dot: "bg-red-300",
        background: "bg-red-100",
        text: "text-red-700"
    },
    green: {
        dot: "bg-lime-300",
        background: "bg-lime-100",
        text: "text-lime-700"
    },
    gray: {
        dot: "bg-gray-300",
        background: "bg-gray-100",
        text: "text-gray-700"
    },
    orange: {
        dot: "bg-orange-300",
        background: "bg-orange-100",
        text: "text-orange-700"
    },
}

const StatusToVisual: Record<RepairStatus, keyof typeof variants> = {
    BOOKED: "gray",
    TO_BE_DIAGNOSED: "blue",
    AWAITING_CONFIRMATION: "orange",
    CANCELED: "red",
    READY_TO_REPAIR: "yellow",
    IN_REPAIR: "yellow",
    AWAITING_PARTS: "orange",
    PAYMENT_REQUIRED: "orange",
    TO_BE_SENT_OUT: "green",
    READY_FOR_PICKUP: "green",
    SENT_OUT: "gray",
    COMPLETED: "gray",
    COMPLAINT: "red",
}


type StatusProps = {
    type: RepairStatus;
    className?: string;
}

export function Status({type, className=""}: StatusProps) {
    const t = useTranslations("Status");
    const selectedVariant: StatusVariant = variants[StatusToVisual[type]];

    return(
        <div className={`flex flex-row gap-2 h-10 w-fit items-center px-2.5 rounded-full ${selectedVariant.background} ${className}`}>
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${selectedVariant.dot}`}/>
            <span className={`font-bold ${selectedVariant.text}`}>{t(type)}</span>
        </div>
    )
}