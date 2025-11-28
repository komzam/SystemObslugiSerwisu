"use client"

import {Card} from "@/components/Atoms/Card";
import {useTranslations} from "next-intl";
import {AddressChangeHandler, AddressForm} from "@/components/Molecules/AddressForm";
import {
    AddressDto,
    ChangeAddressMutation,
    ChangeAddressMutationVariables,
    Country, RemoveAddressMutation,
    RemoveAddressMutationVariables
} from "@/__generated__/types";
import {useState} from "react";
import {Button} from "@/components/Atoms/Button";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {ChangePasswordChangeHandler} from "@/components/Molecules/EditAccount/ChangePasswordForm";
import {HighlightColors, HighlightedText} from "@/components/Atoms/HighlightedText";
import {useMutation} from "@apollo/client/react";
import {CHANGE_ADDRESS} from "@/graphql/ChangeAddress";
import {REMOVE_ADDRESS} from "@/graphql/RemoveAddress";
import {ErrorName} from "@/components/Utils/ErrorName";

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
    const tErr = useTranslations("Errors");
    const authContext = useAuthContext();
    const [addressForm, setAddressForm] = useState<AddressDto>((authContext.authInfo?.__typename === "FullCustomerDto" && authContext.authInfo.address != null)? authContext.authInfo.address : defaultAddress);
    const [error, setError] = useState<string|null>(null);
    const [editingMode, setEditingMode] = useState<boolean>(false);

    const [changeAddress] = useMutation<ChangeAddressMutation, ChangeAddressMutationVariables>(CHANGE_ADDRESS);
    const [removeAddress] = useMutation<RemoveAddressMutation, RemoveAddressMutationVariables>(REMOVE_ADDRESS);

    const onFormChange:AddressChangeHandler = (fieldName, value) => {
        setAddressForm(prev => ({...prev, [fieldName]: value}));
    }

    const onAddressChange = async () => {
        try{
            setError(null);
            await changeAddress({variables:{
                request:{
                    recipientName: addressForm.recipientName,
                    street: addressForm.street,
                    buildingNumber: addressForm.buildingNumber,
                    apartmentNumber: addressForm.apartmentNumber,
                    postalCode: addressForm.postalCode,
                    city: addressForm.city,
                    country: addressForm.country
                }
            }});
            authContext.update();
        }catch(err){
            setError(ErrorName(err, tErr));
        }
    }

    const onAddressRemove = async () => {
        try{
            setError(null);
            await removeAddress();
            authContext.update();
        }catch(err){
            setError(ErrorName(err, tErr));
        }
    }

    return (
        <Card>
            <Card.Label>{t("shippingAddress")}</Card.Label>
            <div className="bg-inherit flex flex-col gap-5 w-fit">
                {error != null && <HighlightedText color={HighlightColors.Red}>{error}</HighlightedText>}

                {!editingMode && authContext.authInfo?.__typename === "FullCustomerDto" && (authContext.authInfo.address == null?
                 <p>{t("noAddress")}</p>
                :
                <div className="flex flex-col">
                    <p>{addressForm.recipientName}</p>
                    <p>{addressForm.street} {addressForm.buildingNumber}{addressForm.apartmentNumber && `/${addressForm.apartmentNumber}`}</p>
                    <p>{addressForm.city} {addressForm.postalCode}</p>
                </div>
                )}
                {editingMode && <AddressForm formData={addressForm} onFormChange={onFormChange}/>}
                <div className={`flex ${editingMode? "flex-col" : "flex-row"} gap-2`}>
                    {!editingMode && <Button onClick={() => setEditingMode(true)}>
                        {authContext.authInfo?.__typename === "FullCustomerDto" && authContext.authInfo.address != null? t("change"): t("add")}
                    </Button>}
                    {editingMode && <Button onClick={onAddressChange}>{t("change")}</Button>}
                    {authContext.authInfo?.__typename === "FullCustomerDto" && authContext.authInfo.address != null &&
                        <Button variant="secondary" color="danger" onClick={onAddressRemove}>{t("remove")}</Button>}
                </div>
            </div>
        </Card>
    )
}