"use client"

import * as React from "react";
import {RepairFormDevInfo} from "@/app/Organisms/RepairFormDevInfo";
import {RepairFormFaultInfo} from "@/app/Organisms/RepairFormFaultInfo";
import {RepairFormAdditionalInfo} from "@/app/Organisms/RepairFormAdditionalInfo";
import {RepairFormConfirmation} from "@/app/Organisms/RepairFormConfirmation";
import {useRouter} from "@/i18n/navigation";
import {RepairFormProgressBar} from "@/app/Organisms/RepairFormProgressBar";
import {BookRepairMutationVariables, ContactMethod, DeviceType, ReturnMethod} from "@/__generated__/types";
import {AdditionalInfoForm} from "@/app/Molecules/AdditionalInfoForm";

const defaultDeviceInfo: BookRepairMutationVariables["request"]["deviceInfo"] = {
    deviceType: DeviceType.Other,
    manufacturer: "",
    model: "",
    serialNumber: "",
};

const defaultFaultInfo: BookRepairMutationVariables["request"]["faultInfo"] = {
    whenOccured: "",
    howToReproduce: "",
    description: "",
    previouslyRepaired: false
};

const defaultAdditionalInfo: AdditionalInfoForm = {
    contactInfo: {
        fullName: "",
        email: "",
        phoneNumber: "",
        phoneRegionCode: "",
        preferredContactMethod: ContactMethod.Sms
    },
    returnInfo: {
        returnMethod: ReturnMethod.SelfPickup,
        address: null
    }
}


export default function RepairForm() {
    const [deviceInfoForm, setDeviceInfoForm] = React.useState<BookRepairMutationVariables["request"]["deviceInfo"]>(defaultDeviceInfo);
    const [faultInfoForm, setFaultInfoForm] = React.useState<BookRepairMutationVariables["request"]["faultInfo"]>(defaultFaultInfo);
    const [additionalInfoForm, setAdditionalInfoForm] = React.useState<AdditionalInfoForm>(defaultAdditionalInfo);
    const [page, setPage] = React.useState<number>(0);

    const router = useRouter();
    const maxPages = 4;

    const nextPage= () => {setPage(page => page!=(maxPages-1) ? page + 1 : (maxPages-1));};
    const prevPage= () => {setPage(page => page!=0 ? page - 1 : 0);};
    const finish = () => {router.push("/")};

    const log = () => {console.log(deviceInfoForm); console.log(faultInfoForm); console.log(additionalInfoForm);}

    return(
        <div className="bg-inherit flex flex-col gap-5 items-center ">
            <RepairFormProgressBar currentStep={page}/>
            {page==0 && <RepairFormDevInfo formData={deviceInfoForm} leftBtnVisible={false} rightBtnOnClick={nextPage}
                onFormChange={(fieldName, value) => setDeviceInfoForm((prev) => ({ ...prev, [fieldName]: value }))}/>}
            {page==1 && <RepairFormFaultInfo formData={faultInfoForm} leftBtnOnClick={prevPage} rightBtnOnClick={nextPage}
                onFormChange={(fieldName, value) => setFaultInfoForm((prev) => ({ ...prev, [fieldName]: value }))}/>}
            {page==2 && <RepairFormAdditionalInfo leftBtnOnClick={prevPage} rightBtnOnClick={log} formData={additionalInfoForm}
                                      onFormChange={(fieldName, value) => setAdditionalInfoForm((prev) => ({ ...prev, [fieldName]: value }))}/>}
            {page==3 && <RepairFormConfirmation leftBtnVisible={false} rightBtnOnClick={finish}/>}
        </div>
    )
}