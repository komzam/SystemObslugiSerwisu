import {useTranslations} from "next-intl";
import {KeyValueLine} from "@/app/Molecules/KeyValueLine";
import {Card} from "@/app/Atoms/Card";

export type RepairDetailsDevInfoProps = {
    deviceType: string;
    manufacturer: string;
    modelName: string;
    serialNumber: string;
}

export function RepairDetailsDevInfo({ deviceType, manufacturer, modelName, serialNumber }: RepairDetailsDevInfoProps) {
    const t = useTranslations("RepairDetails");

    return (
        <Card>
            <Card.Label>{t("deviceInfo")}</Card.Label>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-5">
                    <KeyValueLine wrapperClassName="flex-1" label={t("deviceType")} valueBold={true} value={deviceType} />
                    <KeyValueLine wrapperClassName="flex-1" label={t("manufacturer")} valueBold={true} value={manufacturer} />
                </div>
                <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-5">
                    <KeyValueLine wrapperClassName="flex-1" label={t("modelName")} valueBold={true} value={modelName} />
                    <KeyValueLine wrapperClassName="flex-1" label={t("serialNumber")} valueBold={true} valueHightlighted={true} value={serialNumber} />
                </div>
            </div>
        </Card>
    )
}