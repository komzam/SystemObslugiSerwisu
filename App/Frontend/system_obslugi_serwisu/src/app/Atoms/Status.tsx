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
    [RepairStatus.Created]: "gray",
    [RepairStatus.AwaitingDelivery]: "gray",
    [RepairStatus.Received]: "blue",
    [RepairStatus.AwaitingDiagnosis]: "blue",
    [RepairStatus.Diagnosing]: "yellow",
    [RepairStatus.Unfixable]: "red",
    [RepairStatus.AwaitingApproval]: "orange",
    [RepairStatus.DiagnosisFeeRequired]: "orange",
    [RepairStatus.FinalPaymentRequired]: "orange",
    [RepairStatus.AwaitingRepair]: "blue",
    [RepairStatus.InRepair]: "yellow",
    [RepairStatus.AwaitingParts]: "blue",
    [RepairStatus.RepairFailed]: "red",
    [RepairStatus.ReadyForPickup]: "green",
    [RepairStatus.AwaitingShipping]: "blue",
    [RepairStatus.Shipped]: "green",
    [RepairStatus.Completed]: "gray",
    [RepairStatus.Canceled]: "red",
    [RepairStatus.Complaint]: "red"
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