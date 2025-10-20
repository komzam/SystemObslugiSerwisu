import {useTranslations} from "next-intl";
import {LuMapPin} from "react-icons/lu";
import {SearchRepairShop} from "@/graphql/Search";
import {IconAndTitle} from "./IconAndTitle";

export type AddressWithTitleProps = {
    className?: string;
    address: SearchRepairShop["address"];
}

export function AddressWithTitle({address}: AddressWithTitleProps) {
    const t = useTranslations("RepairShop");
    return (
        <IconAndTitle icon={<LuMapPin className="text-accent4"/>} title={t("address")}>
            <p>{address.street} {address.buildingNumber}{address.apartmentNumber!=null && "/" + address.apartmentNumber}, {address.postalCode} {address.city}</p>
        </IconAndTitle>
    )
}