import {GetRepairQuery, ReturnMethod} from "@/__generated__/types";
import {useTranslations} from "next-intl";
import {Card} from "@/components/Atoms/Card";
import {getEnumKeyByValue} from "@/components/Utils/Enum";
import {LuMapPin, LuPackage} from "react-icons/lu";
import {LabeledText} from "@/components/Molecules/LabeledText";

export type RepairDetailsReturnInfoProps = {
    returnMethod: ReturnMethod;
    returnAddress: GetRepairQuery["repair"]["returnInfo"]["returnAddress"];
}

export function RepairDetailsReturnInfo({ returnMethod, returnAddress }: RepairDetailsReturnInfoProps) {
    const t = useTranslations("RepairDetails");
    const tMethods = useTranslations("ReturnMethods");

    return (
        <Card>
            <Card.Label>{t("returnInfo")}</Card.Label>
            <div className="flex flex-col gap-5">
                <LabeledText className="overflow-hidden text-ellipsis" labelIcon={<LuPackage />} label={t("returnMethod")}>
                    {tMethods(getEnumKeyByValue(ReturnMethod, returnMethod)??"")}
                </LabeledText>

                {returnAddress &&
                    <div className="flex flex-col gap-1 w-full">
                        <p className="font-bold flex flex-row gap-2 items-center">{<LuMapPin />}{t("returnAddress")}</p>
                        <div className="flex flex-col">
                            <p>{returnAddress.recipientName}</p>
                            <p>{returnAddress.street} {returnAddress.buildingNumber}{returnAddress.apartmentNumber && `/${returnAddress.apartmentNumber}`}</p>
                            <p>{returnAddress.city} {returnAddress.postalCode}</p>
                        </div>
                    </div>
                }
            </div>
        </Card>
    )
}