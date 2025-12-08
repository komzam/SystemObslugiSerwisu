"use client"

import {RepairDetailsTitle} from "@/components/Organisms/RepairDetails/RepairDetailsTitle";
import {RepairDetailsDevInfo} from "@/components/Organisms/RepairDetails/RepairDetailsDevInfo";
import {RepairDetailsFaultInfo} from "@/components/Organisms/RepairDetails/RepairDetailsFaultInfo";
import {RepairDetailsImages} from "@/components/Organisms/RepairDetails/RepairDetailsImages";
import {RepairDetailsHistory} from "@/components/Organisms/RepairDetails/RepairDetailsHistory";
import {
    GetRepairHistoryQuery, GetRepairHistoryQueryVariables,
    GetRepairImagesQuery,
    GetRepairImagesQueryVariables,
    GetRepairQuery,
    GetRepairQueryVariables
} from "@/__generated__/types";
import {ProtectedRoute} from "@/components/Utils/ProtectedRoute";
import {useQuery} from "@apollo/client/react";
import {GET_REPAIR} from "@/graphql/GetRepair";
import {useParams} from "next/navigation";
import {Link, useRouter} from "@/i18n/navigation";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {BackButton} from "@/components/Atoms/BackButton";
import {useTranslations} from "next-intl";
import {GET_REPAIR_IMAGES} from "@/graphql/GetRepairImages";
import {GET_REPAIR_HISTORY} from "@/graphql/GetRepairHistory";
import {ErrorName} from "@/components/Utils/ErrorName";
import {useToast} from "@/components/Utils/ToastNotifications";
import {RepairDetailsContactInfo} from "@/components/Organisms/RepairDetails/RepairDetailsContactInfo";
import {RepairDetailsReturnInfo} from "@/components/Organisms/RepairDetails/RepairDetailsReturnInfo";
import {RepairDetailsAdditionalInfo} from "@/components/Organisms/RepairDetails/RepairDetailsAdditionalInfo";

export default function Repair() {
    const params = useParams();
    const t = useTranslations("RepairDetails");
    const tErr = useTranslations("Errors");
    const toasts = useToast();
    const router = useRouter();
    const repairId = params.id;

    if(!repairId) router.back();

    const {data, error, loading, refetch} = useQuery<GetRepairQuery, GetRepairQueryVariables>(GET_REPAIR, {
        variables: {
            repairId: repairId as string
        }
    });

    const {
        data: imgData
    } = useQuery<GetRepairImagesQuery, GetRepairImagesQueryVariables>(GET_REPAIR_IMAGES, {
        variables: {
            repairId: repairId as string
        }
    });

    const {
        data: historyData,
        refetch: historyRefetch
    } = useQuery<GetRepairHistoryQuery, GetRepairHistoryQueryVariables>(GET_REPAIR_HISTORY, {
        variables: {
            repairId: repairId as string
        }
    });

    const onActionSuccess = async () => {
        try {
            await refetch();
            await historyRefetch();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    if(error) return <p>ERROR</p>;
    if(loading) return <LoadingIcon/>;
    if(!data) return <p>ERROR</p>;

    const images = imgData?.repair.images??[];
    const history = historyData?.repair.repairHistory??[];
    const repair = data.repair;

    return (
        <ProtectedRoute>
            <div className="flex bg-inherit justify-center py-5">
                <div className="flex flex-col gap-5 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                    <Link href="/repairs"><BackButton>{t("backButton")}</BackButton></Link>
                    <RepairDetailsTitle.Root>
                        <RepairDetailsTitle.Title title={`${repair.deviceInfo.manufacturer} ${repair.deviceInfo.model}`}
                                                  subtitle={repair.repairShop?.name}
                                                  repairTicketNumber={repair.ticketNumber}/>
                        <RepairDetailsTitle.Conversation conversationId={repair.conversationId}/>
                        <RepairDetailsTitle.Status status={repair.status}/>
                    </RepairDetailsTitle.Root>
                    <RepairDetailsDevInfo deviceType={repair.deviceInfo.deviceType}
                                          manufacturer={repair.deviceInfo.manufacturer}
                                          modelName={repair.deviceInfo.model}
                                          serialNumber={repair.deviceInfo.serialNumber}/>
                    <RepairDetailsFaultInfo
                        whenFaultOccurred={repair.faultInfo.whenOccurred}
                        howToReplicateFault={repair.faultInfo.howToReproduce}
                        faultDescription={repair.faultInfo.description}
                        repairedBefore={repair.faultInfo.previouslyRepaired}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <RepairDetailsContactInfo
                            fullName={repair.contactInfo.fullName}
                            email={repair.contactInfo.email}
                            phoneNumber={repair.contactInfo.phoneNumber}
                            preferredContactMethod={repair.contactInfo.preferredContactMethod}
                        />
                        <RepairDetailsReturnInfo
                            returnMethod={repair.returnInfo.returnMethod}
                            returnAddress={repair.returnInfo.returnAddress}
                        />
                    </div>
                    {repair.additionalComment && <RepairDetailsAdditionalInfo additionalComment={repair.additionalComment} />}
                    <RepairDetailsImages images={images}/>
                    <RepairDetailsHistory repairId={repair.id} repairHistory={history} onActionSuccess={onActionSuccess}/>
                </div>
            </div>
        </ProtectedRoute>
    )
}