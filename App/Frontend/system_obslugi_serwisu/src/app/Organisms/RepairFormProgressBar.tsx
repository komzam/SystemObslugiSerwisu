import {ProgressBar} from "@/app/Molecules/ProgressBar";
import {useTranslations} from "next-intl";
import {Card} from "@/app/Atoms/Card";

export type RepairFormProgressBarProps = {
    currentStep: number;
}

export function RepairFormProgressBar({currentStep}: RepairFormProgressBarProps) {
    const t = useTranslations("RepairForm.navbar");
    return (
        <Card className="w-[clamp(20rem,calc(100vw-var(--page-margin)*2),60rem)]">
            <ProgressBar currentStep={currentStep} stepNames={[t("deviceInfo"), t("faultInfo"), t("additionalInfo"), t("confirmation")]}/>
        </Card>
    )
}