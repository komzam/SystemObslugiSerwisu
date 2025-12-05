import {useTranslations} from "next-intl";
import {KeyValueLine} from "@/components/Molecules/KeyValueLine";
import {Card} from "@/components/Atoms/Card";
import {DeviceType} from "@/__generated__/types";
import {getEnumKeyByValue} from "@/components/Utils/Enum";


export type RepairDetailsDevInfoProps = {
    deviceType: DeviceType;
    manufacturer: string;
    modelName: string;
    serialNumber: string;
    cols?: 1 | 2;
}

export function RepairDetailsDevInfo({ deviceType, manufacturer, modelName, serialNumber, cols=2 }: RepairDetailsDevInfoProps) {
    const t = useTranslations("RepairDetails");
    const tDevType = useTranslations("DeviceTypes");

    return (
        <Card>
            <Card.Label>{t("deviceInfo")}</Card.Label>
            <div className={`grid ${cols==1?"grid-cols-1":"grid-cols-1 sm:grid-cols-2"} auto-rows-fr gap-2 sm:gap-x-5 w-full`}>
                <KeyValueLine wrapperClassName="w-full" label={t("deviceType")} valueBold={true} value={tDevType(getEnumKeyByValue(DeviceType, deviceType)?? "")}/>
                <KeyValueLine wrapperClassName="w-full" label={t("manufacturer")} valueBold={true} value={manufacturer} />
                <KeyValueLine wrapperClassName="w-full" label={t("modelName")} valueBold={true} value={modelName} />
                <KeyValueLine wrapperClassName="w-full" label={t("serialNumber")} valueBold={true} valueHightlighted={true} value={serialNumber} />
            </div>
        </Card>
    )
}