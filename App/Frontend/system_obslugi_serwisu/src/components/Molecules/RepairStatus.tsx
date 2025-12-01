import {RepairStatus} from "@/__generated__/types";
import {useTranslations} from "next-intl";
import {Status, StatusProps, StatusVariant} from "@/components/Atoms/Status";

const StatusToVisual: Record<RepairStatus, StatusVariant> = {
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

type RepairStatusProps = Omit<Omit<StatusProps, 'type'>, "text">&{
    type: RepairStatus;
}

export function RepairStatusC({type, ...props}: RepairStatusProps) {
    const t = useTranslations("Status");
    const selectedVariant: StatusVariant = StatusToVisual[type];

    return <Status type={selectedVariant} text={t(type)} {...props}/>
}