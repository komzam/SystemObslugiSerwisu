import {useTranslations} from "next-intl";
import {LuMapPin} from "react-icons/lu";
import {IconAndTitle} from "./IconAndTitle";
import {GetRepairShopQuery} from "@/__generated__/types";

export type AddressWithTitleProps = {
    className?: string;
    address: GetRepairShopQuery["repairShop"]["address"];
}

export function AddressWithTitle({address}: AddressWithTitleProps) {
    const t = useTranslations("RepairShop");
    return (
        <IconAndTitle icon={<LuMapPin className="text-accent4"/>} title={t("address")}>
            <p>{address.street} {address.buildingNumber}{address.apartmentNumber!=null && "/" + address.apartmentNumber}, {address.postalCode} {address.city}</p>
        </IconAndTitle>
    )
}