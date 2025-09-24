import {useTranslations} from "next-intl";

export enum StatusType{
    Booked="booked",
    ToBeDiagnosed="toBeDiagnosed",
    AwaitingConfirmation="awaitingConfirmation",
    Canceled="canceled",
    ReadyToRepair="readyToRepair",
    InRepair="inRepair",
    AwaitingParts="awaitingParts",
    PaymentRequired="paymentRequired",
    ToBeSentOut="toBeSentOut",
    ReadyForPickup="readyForPickup",
    SentOut="sentOut",
    Completed="completed",
    Complaint="complaint"
}

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

const StatusToVisual: Record<StatusType, keyof typeof variants> = {
    booked: "gray",
    toBeDiagnosed: "blue",
    awaitingConfirmation: "orange",
    canceled: "red",
    readyToRepair: "yellow",
    inRepair: "yellow",
    awaitingParts: "orange",
    paymentRequired: "orange",
    toBeSentOut: "green",
    readyForPickup: "green",
    sentOut: "gray",
    completed: "gray",
    complaint: "red",
}


type StatusProps = {
    type: StatusType;
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