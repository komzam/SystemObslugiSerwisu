"use client"

import * as React from "react";
import {RepairFormDevInfo} from "@/app/Organisms/RepairFormDevInfo";
import {RepairFormFaultInfo} from "@/app/Organisms/RepairFormFaultInfo";
import {RepairFormAdditionalInfo} from "@/app/Organisms/RepairFormAdditionalInfo";
import {RepairFormConfirmation} from "@/app/Organisms/RepairFormConfirmation";
import {useRouter} from "@/i18n/navigation";
import {RepairFormProgressBar} from "@/app/Organisms/RepairFormProgressBar";

export default function RepairForm() {
    const [page, setPage] = React.useState<number>(0);
    const router = useRouter();
    const maxPages = 4;

    const nextPage= () => {setPage(page => page!=(maxPages-1) ? page + 1 : (maxPages-1));};
    const prevPage= () => {setPage(page => page!=0 ? page - 1 : 0);};
    const finish = () => {router.push("/")};

    return(
        <div className="p-[var(--page-margin)] bg-inherit flex flex-col gap-5 items-center ">
            <RepairFormProgressBar currentStep={page}/>
            <RepairFormDevInfo className={page==0? "" : "hidden"} leftBtnVisible={false} rightBtnOnClick={nextPage}/>
            <RepairFormFaultInfo className={page==1? "" : "hidden"} leftBtnOnClick={prevPage} rightBtnOnClick={nextPage}/>
            <RepairFormAdditionalInfo className={page==2? "" : "hidden"} leftBtnOnClick={prevPage} rightBtnOnClick={nextPage}/>
            <RepairFormConfirmation className={page==3? "" : "hidden"} leftBtnVisible={false} rightBtnOnClick={finish}/>
        </div>
    )
}