import { useTranslations} from "next-intl";
import { LabeledTextInput } from "@/app/Molecules/LabeledTextInput";
import {AddressDto} from "@/__generated__/types";

type AddressKey = keyof AddressDto;

export type AddressChangeHandler = <K extends AddressKey>(
    fieldName: K,
    value: AddressDto[K]
) => void;

export type AddressFormProps = {
    formData: AddressDto;
    onFormChange: AddressChangeHandler;
}


export function AddressForm({formData, onFormChange}: AddressFormProps) {
    const t = useTranslations("Address");

    return(
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="recipientName" label={t("recipientName")}
                              value={formData.recipientName}
                              onChange={(e) => onFormChange("recipientName", e.target.value)}/>
            <div className="bg-inherit flex flex-col sm:flex-row gap-5 w-full">
                <LabeledTextInput wrapperClassName="w-full sm:flex-1" className="w-full" id="streetName" label={t("streetName")}
                                  value={formData.street}
                                  onChange={(e) => onFormChange("street", e.target.value)}/>
                <div className="bg-inherit flex flex-row flex-1 gap-5">
                    <LabeledTextInput wrapperClassName="flex-1" className="w-full" id="buildingNumber" label={t("buildingNumber")}
                                      value={formData.buildingNumber}
                                      onChange={(e) => onFormChange("buildingNumber", e.target.value)}/>
                    <LabeledTextInput wrapperClassName="flex-1" className="w-full" id="aptNumber" label={t("aptNumber")}
                                      value={formData.apartmentNumber?? ""}
                                      onChange={(e) => onFormChange("apartmentNumber", e.target.value)}/>
                </div>
            </div>
            <div className="bg-inherit flex flex-row gap-5 w-full">
                <LabeledTextInput wrapperClassName="flex-1" className="w-full" id="postCode" label={t("postCode")}
                                  value={formData.postalCode}
                                  onChange={(e) => onFormChange("postalCode", e.target.value)}/>
                <LabeledTextInput wrapperClassName="flex-1" className="w-full" id="city" label={t("city")}
                                  value={formData.city}
                                  onChange={(e) => onFormChange("city", e.target.value)}/>
            </div>
        </div>
    )
}