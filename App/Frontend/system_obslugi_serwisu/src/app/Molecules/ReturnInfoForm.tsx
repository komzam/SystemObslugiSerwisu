"use client"

import * as React from "react";
import {useTranslations} from "next-intl";
import {LabeledDropdown} from "@/app/Molecules/LabeledDropdown";
import {DropdownItems} from "@/app/Molecules/Dropdown";
import {AddressForm} from "@/app/Molecules/AddressForm";


export function ReturnInfoForm() {
    const t = useTranslations("RepairForm.additionalInfo")
    const [returnMethod, setReturnMethod] = React.useState<string>("selfPickup");

    const returnMethods : DropdownItems = [
        {
            values:[
                {
                    valueName: "selfPickup",
                    valueLabel: t("returnMethods.selfPickup"),
                },
                {
                    valueName: "courierDelivery",
                    valueLabel: t("returnMethods.courierDelivery"),
                }
            ]
        }
    ]

    return (
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledDropdown placeholder="Select" value={returnMethod} onValueChange={setReturnMethod} items={returnMethods} label={t("returnMethod")}/>
            {returnMethod == "courierDelivery" && <AddressForm/>}
        </div>
    )
}