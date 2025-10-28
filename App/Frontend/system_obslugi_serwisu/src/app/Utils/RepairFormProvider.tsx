import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {BookRepairMutationVariables, ContactMethod, Country, DeviceType, ReturnMethod} from "@/__generated__/types";
import {useAuthContext} from "@/app/Utils/AuthContext";

export type RepairFormProviderProps = {
    children: ReactNode;
}

const defaultRepairForm: BookRepairMutationVariables["request"] = {
    repairShopId: "",
    deviceInfo:{
        deviceType: DeviceType.Other,
        manufacturer: "",
        model: "",
        serialNumber: "",
    },
    faultInfo:{
        whenOccured: "",
        howToReproduce: "",
        description: "",
        previouslyRepaired: false
    },
    contactInfo:{
        fullName: "",
        email: "",
        phoneNumber: "",
        phoneRegionCode: "PL",
        preferredContactMethod: ContactMethod.Sms
    },
    returnInfo:{
        returnMethod: ReturnMethod.SelfPickup,
        address: {
            recipientName: "",
            street: "",
            buildingNumber: "",
            postalCode: "",
            city: "",
            country: Country.Poland
        }
    }
}

type RepairFormContextProps = {
    setRepairForm:  Dispatch<SetStateAction<BookRepairMutationVariables["request"]>>;
    repairFormData: BookRepairMutationVariables["request"];
}

const RepairFormContext = createContext<RepairFormContextProps | null>(null);

export function RepairFormProvider({children} : RepairFormProviderProps) {
    const [repairForm, setRepairForm] = useState<BookRepairMutationVariables["request"]>(defaultRepairForm);
    const authContext = useAuthContext();

    useEffect(() => {
        const savedForm = sessionStorage.getItem("repairFormData");
        if(savedForm)
            setRepairForm(JSON.parse(savedForm));
    }, []);

    useEffect(() => {
       sessionStorage.setItem("repairFormData", JSON.stringify(repairForm));
    }, [repairForm]);

    useEffect(() => {
        if(authContext.isLoggedIn && repairForm.contactInfo.email == ""){
            setRepairForm((prev) => ({...prev, contactInfo:{
                fullName: authContext.authInfo?.name,
                email: authContext.authInfo?.email,
                phoneNumber: authContext.authInfo?.phone?? "",
                phoneRegionCode: authContext.authInfo?.phoneRegionCode?? "PL",
                preferredContactMethod: authContext.authInfo?.preferredContactMethod?? ContactMethod.Sms
            }}));
        }
    }, [authContext.authInfo]);

    return (
        <RepairFormContext.Provider value={{repairFormData: repairForm, setRepairForm: setRepairForm}}>
            {children}
        </RepairFormContext.Provider>
    )
}

export function useRepairFormContext(){
    const context = useContext(RepairFormContext);
    if (!context) {
        throw new Error("Function used outside auth context provider")
    }
    return context;
}