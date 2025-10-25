"use client"

import * as React from "react";
import {RepairFormDevInfo} from "@/app/Organisms/RepairFormDevInfo";
import {RepairFormFaultInfo} from "@/app/Organisms/RepairFormFaultInfo";
import {RepairFormAdditionalInfo} from "@/app/Organisms/RepairFormAdditionalInfo";
import {RepairFormConfirmation} from "@/app/Organisms/RepairFormConfirmation";
import {useRouter} from "@/i18n/navigation";
import {RepairFormProgressBar} from "@/app/Organisms/RepairFormProgressBar";
import {RepairFormProvider, useRepairFormContext} from "@/app/Utils/RepairFormProvider";


export default function BookRepair(){
    return <RepairFormProvider>
        <RepairForm/>
    </RepairFormProvider>
}

function RepairForm() {
    const [page, setPage] = React.useState<number>(0);
    const repairFormContext = useRepairFormContext();
    const formData = repairFormContext.repairFormData;

    const router = useRouter();
    const maxPages = 4;

    const nextPage= () => {setPage(page => page!=(maxPages-1) ? page + 1 : (maxPages-1));};
    const prevPage= () => {setPage(page => page!=0 ? page - 1 : 0);};
    const finish = () => {router.push("/")};

    const log = () => {
        console.log(formData.deviceInfo);
        console.log(formData.faultInfo);
        console.log(formData.faultInfo);
        console.log(formData.returnInfo);
    }

    return(
        <div className="bg-inherit flex flex-col gap-5 items-center ">
            <RepairFormProgressBar currentStep={page}/>
            {page==0 && <RepairFormDevInfo leftBtnVisible={false} rightBtnOnClick={nextPage}/>}
            {page==1 && <RepairFormFaultInfo leftBtnOnClick={prevPage} rightBtnOnClick={nextPage}/>}
            {page==2 && <RepairFormAdditionalInfo leftBtnOnClick={prevPage} rightBtnOnClick={log}/>}
            {page==3 && <RepairFormConfirmation leftBtnVisible={false} rightBtnOnClick={finish}/>}
        </div>
    )
}