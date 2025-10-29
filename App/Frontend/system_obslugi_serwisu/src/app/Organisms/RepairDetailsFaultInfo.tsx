import {Card} from "@/app/Atoms/Card";
import {useTranslations} from "next-intl";
import {LabeledText} from "@/app/Molecules/LabeledText";

type RepairDetailsFaultInfoProps = {
    whenFaultOccurred: string;
    howToReplicateFault: string;
    faultDescription: string;
}

export function RepairDetailsFaultInfo({whenFaultOccurred, howToReplicateFault, faultDescription}: RepairDetailsFaultInfoProps) {
    const t = useTranslations("RepairDetails");

    return (
        <Card>
            <Card.Label>{t("faultInfo")}</Card.Label>
            <div className="flex flex-col gap-5">
                <LabeledText className="overflow-hidden text-ellipsis" label={t("whenFaultOccurred")}>{whenFaultOccurred}</LabeledText>
                <LabeledText className="overflow-hidden text-ellipsis" label={t("howToReplicateFault")}>{howToReplicateFault}</LabeledText>
                <LabeledText className="overflow-hidden text-ellipsis" label={t("faultDescription")}>{faultDescription}</LabeledText>
            </div>
        </Card>
    )
}