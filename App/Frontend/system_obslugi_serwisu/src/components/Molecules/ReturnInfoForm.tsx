"use client"

import * as React from "react";
import {useMemo} from "react";
import {useTranslations} from "next-intl";
import {LabeledDropdown} from "@/components/Molecules/LabeledDropdown";
import {DropdownItems} from "@/components/Molecules/Dropdown";
import {AddressChangeHandler, AddressForm} from "@/components/Molecules/AddressForm";
import {AddressInput, BookRepairMutationVariables, Country, ReturnMethod} from "@/__generated__/types";
import {useRepairFormContext} from "@/components/Utils/RepairFormProvider";
import {useAuthContext} from "@/components/Utils/AuthContext";


type ReturnInfoKey = keyof BookRepairMutationVariables["request"]["returnInfo"];

export type ReturnInfoChangeHandler = <K extends ReturnInfoKey>(
    fieldName: K,
    value: BookRepairMutationVariables["request"]["returnInfo"][K]
) => void;

const defaultAddressForm : AddressInput = {
    recipientName: "",
    street: "",
    buildingNumber: "",
    postalCode: "",
    city: "",
    country: Country.Poland
};

export function ReturnInfoForm() {
    const t = useTranslations("RepairForm.additionalInfo");
    const tMethods = useTranslations("ReturnMethods");
    const repairFormContext = useRepairFormContext();
    const formData = repairFormContext.repairFormData.returnInfo;

    const updateForm:ReturnInfoChangeHandler = (fieldName, value) => {
        repairFormContext.setRepairForm((prev) => ({ ...prev, returnInfo:{ ...prev.returnInfo, [fieldName]: value }}));
    };

    const updateAddressForm:AddressChangeHandler = (fieldName, value) => {
        if(fieldName.startsWith("__"))
            return;

        repairFormContext.setRepairForm((prev) => {
            const address = prev.returnInfo.address ?? defaultAddressForm;
            return { ...prev, returnInfo:{
                ...prev.returnInfo,
                address:{
                    ...address,
                    [fieldName]: value
                }
            }}
        });
    };

    const returnMethods : DropdownItems = useMemo(() => {
        const items: DropdownItems = [{values: []}];
        for (const key in ReturnMethod) {
            if (ReturnMethod.hasOwnProperty(key)) {
                const enumKey = key as keyof typeof ReturnMethod;
                items[0].values.push({
                    valueName: ReturnMethod[enumKey],
                    valueLabel: tMethods(key)
                });
            }
        }
        return items;
    }, []);

    return (
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledDropdown placeholder="Select" items={returnMethods} label={t("returnMethod")}
            value={formData.returnMethod} onValueChange={(value) => { updateForm("returnMethod", value as ReturnMethod);}}/>
            {formData.returnMethod == ReturnMethod.CourierDelivery &&
                <AddressForm formData={formData.address?? defaultAddressForm}
                   onFormChange={(fieldName, value) => {updateAddressForm(fieldName, value)}}/>
            }
        </div>
    )
}