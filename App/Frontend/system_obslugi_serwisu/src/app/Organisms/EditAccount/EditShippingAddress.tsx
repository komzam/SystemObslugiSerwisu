"use client"

import {Card} from "@/app/Atoms/Card";
import {useTranslations} from "next-intl";
import {AddressForm} from "@/app/Molecules/AddressForm";
import {AddressDto, Country} from "@/__generated__/types";
import {useState} from "react";
import {Button} from "@/app/Atoms/Button";

const defaultAddress: AddressDto = {
    recipientName:"",
    street: "",
    buildingNumber: "",
    apartmentNumber: "",
    city: "",
    postalCode: "",
    country: Country.Poland
};

export function EditShippingAddress(){
    const t = useTranslations("EditAccount");
    const [addressForm, setAddressForm] = useState<AddressDto>(defaultAddress);

    return (
        <Card>
            <Card.Label>{t("shippingAddress")}</Card.Label>
            <div className="bg-inherit flex flex-col gap-5 w-fit">
                <AddressForm formData={addressForm} onFormChange={()=> console.log("change")}/>
                <Button>{t("change")}</Button>
            </div>
        </Card>
    )
}