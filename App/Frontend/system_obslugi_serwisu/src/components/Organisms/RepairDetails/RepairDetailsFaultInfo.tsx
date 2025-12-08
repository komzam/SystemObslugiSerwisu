import {Card} from "@/components/Atoms/Card";
import {useTranslations} from "next-intl";
import {LabeledText} from "@/components/Molecules/LabeledText";

type RepairDetailsFaultInfoProps = {
    whenFaultOccurred: string;
    howToReplicateFault: string;
    faultDescription: string;
    repairedBefore: boolean;
}

export function RepairDetailsFaultInfo({whenFaultOccurred, howToReplicateFault, faultDescription, repairedBefore}: RepairDetailsFaultInfoProps) {
    const t = useTranslations("RepairDetails");
    const tComm = useTranslations("Common");

    return (
        <Card>
            <Card.Label>{t("faultInfo")}</Card.Label>
            <div className="flex flex-col gap-5">
                <LabeledText className="overflow-hidden text-ellipsis" label={t("whenFaultOccurred")}>{whenFaultOccurred}</LabeledText>
                <LabeledText className="overflow-hidden text-ellipsis" label={t("howToReplicateFault")}>{howToReplicateFault}</LabeledText>
                <LabeledText className="overflow-hidden text-ellipsis" label={t("faultDescription")}>{faultDescription}</LabeledText>
                <LabeledText className="overflow-hidden text-ellipsis" label={t("repairedBefore")}>{repairedBefore?tComm("yes"):tComm("no")}</LabeledText>
            </div>
        </Card>
    )
}