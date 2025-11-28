import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {BookRepairMutationVariables, ContactMethod, Country, DeviceType, ReturnMethod} from "@/__generated__/types";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {useDebounce} from "@/components/Hooks/useDebounce";

export type RepairFormProviderProps = {
    children: ReactNode;
}

const defaultContactInfo: BookRepairMutationVariables["request"]["contactInfo"] = {
    fullName: "",
    email: "",
    phoneNumber: "",
    phoneRegionCode: "PL",
    preferredContactMethod: ContactMethod.Sms
}

const defaultReturnInfo: BookRepairMutationVariables["request"]["returnInfo"]= {
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

const defaultRepairForm: BookRepairMutationVariables["request"] = {
    repairShopId: "",
    deviceInfo:{
        deviceType: DeviceType.Other,
        manufacturer: "",
        model: "",
        serialNumber: "",
    },
    faultInfo:{
        whenOccurred: "",
        howToReproduce: "",
        description: "",
        previouslyRepaired: false
    },
    contactInfo: defaultContactInfo,
    returnInfo: defaultReturnInfo,
    additionalComment: null
}

type RepairFormContextProps = {
    setRepairForm:  Dispatch<SetStateAction<BookRepairMutationVariables["request"]>>;
    repairFormData: BookRepairMutationVariables["request"];
    clearStorage: () => void;
}

const RepairFormContext = createContext<RepairFormContextProps | null>(null);

export function RepairFormProvider({children} : RepairFormProviderProps) {
    const [repairForm, setRepairForm] = useState<BookRepairMutationVariables["request"]>(defaultRepairForm);
    const debouncedRepairForm = useDebounce(repairForm);
    const authContext = useAuthContext();

    useEffect(() => {
        const savedForm = sessionStorage.getItem("repairFormData");
        if(savedForm)
            setRepairForm(JSON.parse(savedForm));
    }, []);

    useEffect(() => {
        sessionStorage.setItem("repairFormData", JSON.stringify(repairForm));
    }, [debouncedRepairForm]);

    useEffect(() => {
        if (authContext.isLoggedIn && repairForm.contactInfo == defaultContactInfo) {
            setRepairForm((prev) => {
                if(authContext.authInfo?.__typename != "FullCustomerDto") return prev;
                return {
                    ...prev, contactInfo: {
                        fullName: authContext.authInfo?.name,
                        email: authContext.authInfo?.email,
                        phoneNumber: authContext.authInfo?.phone ?? "",
                        phoneRegionCode: authContext.authInfo?.phoneRegionCode ?? "PL",
                        preferredContactMethod: authContext.authInfo?.preferredContactMethod ?? ContactMethod.Sms
                    }
                };
            });
        }
        if (authContext.isLoggedIn && repairForm.returnInfo == defaultReturnInfo) {
            setRepairForm((prev) => {
                if(authContext.authInfo?.__typename != "FullCustomerDto") return prev;
                return {
                    ...prev, returnInfo: {
                        returnMethod: authContext.authInfo?.preferredReturnMethod ?? ReturnMethod.SelfPickup,
                        address: authContext.authInfo?.address
                    }
                };
            });
        }
    }, [authContext.authInfo]);

    const clearStorage = () => {
        sessionStorage.removeItem("repairFormData");
    }

    return (
        <RepairFormContext.Provider value={{repairFormData: repairForm, setRepairForm, clearStorage}}>
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