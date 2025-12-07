import {useTranslations} from "next-intl";
import {ActionMessage, ActionRoot} from "@/components/Organisms/RepairDetails/RepairDetailsActions";

type ActionProps = {
    repairId: string;
    onActionSuccess: () => void;
}

export function AwaitingApproval({repairId, onActionSuccess}: ActionProps) {
    const t = useTranslations("RepairActions.AwaitingApproval");
    return (
        <ActionRoot>
            <ActionMessage type="info">{t("message")}</ActionMessage>
        </ActionRoot>
    );
}