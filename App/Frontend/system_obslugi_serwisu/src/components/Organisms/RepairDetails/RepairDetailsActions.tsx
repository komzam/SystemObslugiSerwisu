import {RepairStatus} from "@/__generated__/types";
import {ReactNode} from "react";
import {Card} from "@/components/Atoms/Card";
import {LuInfo} from "react-icons/lu";
import {AwaitingDelivery} from "@/components/Organisms/RepairDetails/RepairActions/AwaitingDelivery";
import {AwaitingDiagnosis} from "@/components/Organisms/RepairDetails/RepairActions/AwaitingDiagnosis";
import {Diagnosing} from "@/components/Organisms/RepairDetails/RepairActions/Diagnosing";
import {DiagnosisFeeRequired} from "@/components/Organisms/RepairDetails/RepairActions/DiagnosisFeeRequired";
import {FinalPaymentRequired} from "@/components/Organisms/RepairDetails/RepairActions/FinalPaymentRequired";
import {AwaitingRepair} from "@/components/Organisms/RepairDetails/RepairActions/AwaitingRepair";
import {InRepair} from "@/components/Organisms/RepairDetails/RepairActions/InRepair";
import {AwaitingParts} from "@/components/Organisms/RepairDetails/RepairActions/AwaitingParts";
import {ReadyForPickup} from "@/components/Organisms/RepairDetails/RepairActions/ReadyForPickup";
import {AwaitingShipping} from "@/components/Organisms/RepairDetails/RepairActions/AwaitingShipping";
import {Shipped} from "@/components/Organisms/RepairDetails/RepairActions/Shipped";
import {Completed} from "@/components/Organisms/RepairDetails/RepairActions/Completed";
import {Complaint} from "@/components/Organisms/RepairDetails/RepairActions/Complaint";
import {AwaitingApproval} from "@/components/Organisms/RepairDetails/RepairActions/AwaitingApproval";

type RepairDetailsActionsProps = {
    status: RepairStatus;
    repairId: string;
    onActionSuccess: () => void;
}

export function RepairDetailsActions({status, repairId, onActionSuccess}:RepairDetailsActionsProps) {
    switch(status){
        case RepairStatus.AwaitingDelivery:
            return <AwaitingDelivery repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.AwaitingDiagnosis:
            return <AwaitingDiagnosis repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.Diagnosing:
            return <Diagnosing repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.AwaitingApproval:
            return <AwaitingApproval repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.DiagnosisFeeRequired:
            return <DiagnosisFeeRequired repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.FinalPaymentRequired:
            return <FinalPaymentRequired repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.AwaitingRepair:
            return <AwaitingRepair repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.InRepair:
            return <InRepair repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.AwaitingParts:
            return <AwaitingParts repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.ReadyForPickup:
            return <ReadyForPickup repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.AwaitingShipping:
            return <AwaitingShipping repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.Shipped:
            return <Shipped repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.Completed:
            return <Completed repairId={repairId} onActionSuccess={onActionSuccess} />;

        case RepairStatus.Complaint:
            return <Complaint repairId={repairId} onActionSuccess={onActionSuccess} />;

        default:
            return null;
    }
}

type RootProps = {
    children: ReactNode;
};
export function ActionRoot({children}: RootProps) {
    return(
        <Card className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3">
            {children}
        </Card>
    )
}

type MessageProps = {
    children: string;
    type?: "normal" | "info";
}
export function ActionMessage({children, type="normal"}: MessageProps) {
    return (
        <p className="flex flex-row items-center gap-2 font-bold">
            {type=="info" && <LuInfo className="text-primary" size="1.5rem"/>}
            {children}
        </p>
    );
}

