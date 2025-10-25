"use client"

import * as React from "react";
import {useEffect, useMemo} from "react";
import {useTranslations} from "next-intl";
import {LabeledDropdown} from "@/app/Molecules/LabeledDropdown";
import {DropdownItems} from "@/app/Molecules/Dropdown";
import {AddressChangeHandler, AddressForm} from "@/app/Molecules/AddressForm";
import {AddressInput, BookRepairMutationVariables, Country, ReturnMethod} from "@/__generated__/types";
import {useRepairFormContext} from "@/app/Utils/RepairFormProvider";
import {useAuthContext} from "@/app/Utils/AuthContext";


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
    const authContext = useAuthContext();
    const repairFormContext = useRepairFormContext();
    const formData = repairFormContext.repairFormData.returnInfo;

    const updateForm:ReturnInfoChangeHandler = (fieldName, value) => {
        repairFormContext.setRepairForm((prev) => ({ ...prev, returnInfo:{ ...prev.returnInfo, [fieldName]: value }}));
    };

    const updateAddressForm:AddressChangeHandler = (fieldName, value) => {
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
        let i = 0;
        for (const key in ReturnMethod) {
            if (ReturnMethod.hasOwnProperty(key)) {
                const enumKey = key as keyof typeof ReturnMethod;
                items[0].values.push({
                    valueName: ReturnMethod[enumKey],
                    valueLabel: t("returnMethods." + key),
                });
                i++;
            }
        }
        return items;
    }, []);

    useEffect(() => {
        if(authContext.isLoggedIn){
            updateForm("returnMethod", authContext.authInfo?.preferredReturnMethod?? ReturnMethod.SelfPickup);
            console.log(authContext.authInfo);
            if(formData.address?.recipientName == "" && authContext.authInfo?.address){
                updateForm("address", authContext.authInfo.address)
            }
        }
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