"use client"

import {useEffect, useRef, useState} from "react";
import {RepairFormDevInfo} from "@/app/Organisms/RepairFormDevInfo";
import {RepairFormFaultInfo} from "@/app/Organisms/RepairFormFaultInfo";
import {RepairFormAdditionalInfo} from "@/app/Organisms/RepairFormAdditionalInfo";
import {RepairFormConfirmation} from "@/app/Organisms/RepairFormConfirmation";
import {useRouter} from "@/i18n/navigation";
import {RepairFormProgressBar} from "@/app/Organisms/RepairFormProgressBar";
import {RepairFormProvider, useRepairFormContext} from "@/app/Utils/RepairFormProvider";
import {BOOK_REPAIR_QUERY} from "@/graphql/BookRepair";
import {useMutation} from "@apollo/client/react";
import {AddressDto, BookRepairMutation, BookRepairMutationVariables, ReturnMethod} from "@/__generated__/types";
import {useParams} from "next/navigation";
import {useTranslations} from "next-intl";
import {HighlightColors, HighlightedText} from "@/app/Atoms/HighlightedText";
import {ErrorName} from "@/app/Utils/ErrorName";


export default function BookRepair()
{
    const searchParams = useParams();
    const repairShopId = searchParams.id;
    const router = useRouter();

    if(repairShopId == null)
        router.push("/");

    return <RepairFormProvider>
        <RepairForm repairShopId={repairShopId as string}/>
    </RepairFormProvider>
}

type RepairFormProps = {
    repairShopId: string;
}

function RepairForm({repairShopId}: RepairFormProps) {
    const [page, setPage] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const tErr = useTranslations("Errors");
    const repairFormContext = useRepairFormContext();
    const formData = repairFormContext.repairFormData;

    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const maxPages = 4;

    const [bookRepair, {data}] = useMutation<BookRepairMutation, BookRepairMutationVariables>(BOOK_REPAIR_QUERY);

    useEffect(() => {
        const sessionPage = sessionStorage.getItem("repairFormPage");
        if(sessionPage){
            setPage(Number.parseInt(sessionPage));
        }
    }, []);

    const nextPage= (save: boolean = true) =>
    {
        if(!formRef?.current?.checkValidity())
            return;

        setPage(page => {
            const newPage = Math.min(page + 1, maxPages - 1);

            if(save)
                sessionStorage.setItem("repairFormPage", newPage.toString());

            return newPage;
        });
    };
    const prevPage= () =>
    {
        setPage(page => {
            const newPage = Math.max(page-1, 0);
            sessionStorage.setItem("repairFormPage", newPage.toString());
            return newPage;
        });
    };

    const submitButton = async () => {
        setError(null);
        if(!formRef?.current?.checkValidity())
            return;

        const localFormData = formData;
        localFormData.repairShopId = repairShopId;

        if(localFormData.returnInfo.returnMethod == ReturnMethod.SelfPickup)
            localFormData.returnInfo.address = null;

        try {
            await bookRepair({variables:{request:localFormData}});
        } catch (err) {
            console.log(err);
            console.log(localFormData);
            setError(ErrorName(err, tErr));
            window.scrollTo(0,0);
            return;
        }
        nextPage(false);
        repairFormContext.clearStorage();
        sessionStorage.removeItem("repairFormPage");
    }

    const finish = () => {router.push("/");};

    return(
        <div className="bg-inherit flex flex-col gap-5 items-center ">
            <RepairFormProgressBar currentStep={page}/>
            {error != null && <HighlightedText className="p-5 wrap-break-word w-[clamp(20rem,calc(100vw-var(--page-margin)*2),60rem)]" color={HighlightColors.Red}>{error}</HighlightedText>}
            <form ref={formRef} onSubmit={(e)=>{e.preventDefault()}}>
            {page==0 && <RepairFormDevInfo leftBtnVisible={false} rightBtnOnClick={nextPage}/>}
            {page==1 && <RepairFormFaultInfo leftBtnOnClick={prevPage} rightBtnOnClick={nextPage}/>}
            {page==2 && <RepairFormAdditionalInfo leftBtnOnClick={prevPage} rightBtnOnClick={submitButton}/>}
            {page==3 && <RepairFormConfirmation leftBtnVisible={false} rightBtnOnClick={finish}
                                                repairTickerNumber={data?.bookRepair.ticketNumber??""}
                                                createdAt={data?.bookRepair.createdAt??""}
                                                repairShopAddress={data?.bookRepair.repairShop?.address as AddressDto}
            />}
            </form>
        </div>
    )
}