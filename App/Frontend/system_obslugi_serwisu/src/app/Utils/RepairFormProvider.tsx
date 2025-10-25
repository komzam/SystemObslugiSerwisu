import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {BookRepairMutationVariables, ContactMethod, Country, DeviceType, ReturnMethod} from "@/__generated__/types";

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
        phoneRegionCode: "",
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