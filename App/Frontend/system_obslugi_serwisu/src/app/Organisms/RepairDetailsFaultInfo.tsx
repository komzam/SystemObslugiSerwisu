import {LabeledCard} from "@/app/Molecules/LabeledCard";
import {useTranslations} from "next-intl";
import {LabeledText} from "@/app/Molecules/LabeledText";

type RepairDetailsFaultInfoProps = {
    whenFaultOccured: string;
    howToReplicateFault: string;
    faultDescription: string;
}

export function RepairDetailsFaultInfo({whenFaultOccured, howToReplicateFault, faultDescription}: RepairDetailsFaultInfoProps) {
    const t = useTranslations("RepairDetails");

    return (
        <LabeledCard label={t("faultInfo")}>
            <div className="flex flex-col gap-5">
                <LabeledText className="overflow-hidden text-ellipsis" label={t("whenFaultOccured")}>{whenFaultOccured}</LabeledText>
                <LabeledText className="overflow-hidden text-ellipsis" label={t("howToReplicateFault")}>{howToReplicateFault}</LabeledText>
                <LabeledText className="overflow-hidden text-ellipsis" label={t("faultDescription")}>{faultDescription}</LabeledText>
            </div>
        </LabeledCard>
    )
}