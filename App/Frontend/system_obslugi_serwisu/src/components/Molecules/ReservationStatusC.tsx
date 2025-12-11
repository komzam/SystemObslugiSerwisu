import {ReservationStatus} from "@/__generated__/types";
import {Status, StatusProps, StatusVariant} from "@/components/Atoms/Status";
import {useTranslations} from "next-intl";

const StatusToVisual: Record<ReservationStatus, StatusVariant> = {
    [ReservationStatus.Reserved]: "blue",
    [ReservationStatus.AwaitingStock]: "yellow",
    [ReservationStatus.Canceled]: "red",
    [ReservationStatus.Consumed]: "green"
}

type PartStatusProps = Omit<Omit<StatusProps, 'type'>, "text">&{
    type: ReservationStatus
}

export function ReservationStatusC({type, ...props}: PartStatusProps) {
    const t = useTranslations("ReservationStatus");
    const selectedVariant: StatusVariant = StatusToVisual[type];

    return <Status type={selectedVariant} text={t(type)} {...props}/>
}