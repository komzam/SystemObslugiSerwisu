import {SearchRepairShop} from "@/graphql/Search";
import {LuMapPin} from "react-icons/lu";

export type AddressProps = {
    className?: string;
    address: SearchRepairShop["address"];
}

export function Address({className="", address}: AddressProps) {
    return (
        <div className={`flex flex-row items-center gap-2 ${className}`}>
            <LuMapPin className="text-accent4"/>
            <p>{address.street} {address.buildingNumber}{address.apartmentNumber!=null && "/" + address.apartmentNumber}, {address.postalCode} {address.city}</p>
        </div>
    )
}