"use client"

import {useParams} from "next/navigation";
import {useTranslations} from "next-intl";
import {Link, useRouter} from "@/i18n/navigation";
import {useToast} from "@/components/Utils/ToastNotifications";
import {useQuery} from "@apollo/client/react";
import { GetPartQuery, GetPartQueryVariables} from "@/__generated__/types";
import {BackButton} from "@/components/Atoms/BackButton";
import {PartDetailsTitle} from "@/components/Organisms/PartDetails/PartDetailsTitle";
import {GET_PART} from "@/graphql/GetPart";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {PartDetailsDetails} from "@/components/Organisms/PartDetails/PartDetailsDetails";
import {PartDetailsActions} from "@/components/Organisms/PartDetails/PartDetailsActions";
import {ErrorName} from "@/components/Utils/ErrorName";
import {PartDetailsReservations} from "@/components/Organisms/PartDetails/PartDetailsReservations";

export default function Part() {
    const params = useParams();
    const t = useTranslations("PartDetails");
    const tErr = useTranslations("Errors");
    const router = useRouter();
    const toasts = useToast();
    const partId = params.id;

    if (!partId) router.back();

    const {data, error, loading, refetch} = useQuery<GetPartQuery, GetPartQueryVariables>(GET_PART, {
        variables: {
            partId: partId as string
        }
    });

    const onRefetch = () =>{
        try{
            refetch();
        }catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    if (error) return <p>ERROR</p>;
    if (loading) return <LoadingIcon/>;
    if (!data) return <p>ERROR</p>;

    return (
        <div className="flex bg-inherit justify-center py-5">
            <div className="flex flex-col gap-5 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                <Link href={"/inventory"}><BackButton>{t("backButton")}</BackButton></Link>
                <PartDetailsTitle
                    partName={data.part.name}
                    category={data.part.category?.name??""}
                    stockLevel={data.part.stockLevel}
                    stock={data.part.stock}
                />
                <PartDetailsActions
                    partId={data.part.id}
                    needsReorder={data.part.needsReorder}
                    stock={data.part.stock}
                    onActionSuccess={onRefetch}/>
                <PartDetailsDetails
                    price={data.part.price}
                    lowStockThreshold={data.part.lowStockThreshold}
                    manufacturerCode={data.part.manufacturerCode}
                />
                <PartDetailsReservations partId={data.part.id}/>
            </div>
        </div>
    );
}