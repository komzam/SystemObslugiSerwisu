import {useTranslations} from "next-intl";
import {Card} from "@/components/Atoms/Card";
import {LabeledText} from "@/components/Molecules/LabeledText";
import {LuPen} from "react-icons/lu";

type RepairDetailsAdditionalInfoProps = {
    additionalComment: string;
}

export function RepairDetailsAdditionalInfo({additionalComment}: RepairDetailsAdditionalInfoProps) {
    const t = useTranslations("RepairDetails");

    return (
        <Card>
            <Card.Label>{t("additionalInfo")}</Card.Label>
            <div className="flex flex-col gap-5">
                <LabeledText className="overflow-hidden text-ellipsis" labelIcon={<LuPen/>} label={t("additionalComment")}>{additionalComment}</LabeledText>
            </div>
        </Card>
    )
}