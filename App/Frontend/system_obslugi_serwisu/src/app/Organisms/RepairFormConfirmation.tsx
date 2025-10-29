import {RepairFormCard, RepairFormCardProps} from "@/app/Molecules/RepairFormCard";
import {useTranslations} from "next-intl";
import { LuCircleCheckBig } from "react-icons/lu";
import {StepList, StepInfo} from "@/app/Molecules/StepList";
import {CardWithHeader} from "@/app/Atoms/CardWithHeader";
import {Button} from "@/app/Atoms/Button";
import {KeyValueList} from "@/app/Molecules/KeyValueList";
import {KeyValueLineProps} from "@/app/Molecules/KeyValueLine";
import {DateTime} from "luxon";
import {AddressDto} from "@/__generated__/types";

type FormProps = Omit<RepairFormCardProps, 'title'> & {
    repairTickerNumber: string;
    createdAt: string;
    repairShopAddress: AddressDto;
};

export function RepairFormConfirmation({repairTickerNumber, createdAt, repairShopAddress, ...props} : FormProps) {
    const t = useTranslations("RepairForm.confirmation");

    const steps : StepInfo[] = [
        { stepText: t("step1") },
        { stepText: t("step2"), stepDescription: t("step2Desc")},
        { stepText: t("step3") }
    ]

    const ticketDetails: KeyValueLineProps[] = [
        { label: t("repairTicketNumber"), value: repairTickerNumber },
        { label: t("created"), value: DateTime.fromISO(createdAt).toFormat("HH:mm:ss dd.MM.yyyy") }
    ]

    return (
        <RepairFormCard title={t("title")} icon={<LuCircleCheckBig className="text-larger1" />} rightBtnName={t("finish")} {...props}>
            <div className="flex flex-col md:flex-row w-full gap-10">
                <CardWithHeader className="flex-1">
                    <CardWithHeader.Header>
                        <span className="text-larger2 text-white">{t("ticketDetails")}</span>
                    </CardWithHeader.Header>
                    <CardWithHeader.Card>
                        <KeyValueList items={ticketDetails}/>
                    </CardWithHeader.Card>
                </CardWithHeader>
                <CardWithHeader className="flex-1">
                    <CardWithHeader.Header>
                        <span className="text-larger2 text-white">{t("repairShopAddress")}</span>
                    </CardWithHeader.Header>
                    <CardWithHeader.Card>
                        <p>{repairShopAddress.recipientName}</p>
                        <p>{repairShopAddress.street} {repairShopAddress.buildingNumber}{repairShopAddress.apartmentNumber && `/${repairShopAddress.apartmentNumber}`}</p>
                        <p>{repairShopAddress.city} {repairShopAddress.postalCode}</p>
                    </CardWithHeader.Card>
                </CardWithHeader>
            </div>
            <StepList steps={steps}/>
            <Button className="w-full" variant="secondary">{t("printRepairTicket")}</Button>
        </RepairFormCard>
    )
}