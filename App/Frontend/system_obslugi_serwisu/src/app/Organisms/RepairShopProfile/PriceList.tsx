"use client"

import {useTranslations} from "next-intl";
import {KeyValueList} from "@/app/Molecules/KeyValueList";
import {useState} from "react";
import {useQuery} from "@apollo/client/react";
import {LoadingIcon} from "@/app/Molecules/LoadingIcon";
import {GET_SERVICES, GetServicesQuery} from "@/graphql/GetServices";
import {PageSelector} from "@/app/Molecules/PageSelector";

export type PriceListProps = { repairShopId: string }
export function PriceList({repairShopId}: PriceListProps) {
    const t = useTranslations("RepairShop");
    const tComm = useTranslations("Common");
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data} = useQuery<GetServicesQuery>(GET_SERVICES, {
        variables: {
            repairShopId:repairShopId,
            pageNumber:currentPage,
            pageSize:5
        }
    });

    if(loading) return <LoadingIcon/>;
    if (!data) return <p>{tComm("noData")}</p>;


    const kvProps = data.services.items.map((service) =>
        ({label:service.name, value: service.price, labelBold:true}));

    return (
        <div className="flex flex-col gap-5 w-[clamp(2rem,100%,40rem)]">
            {kvProps.length == 0 ?
                <p>{t("noPriceList")}</p>
                :
                <KeyValueList items={kvProps} useSeparator={true}/>
            }
            <PageSelector totalPages={data.services.totalPages} currentPage={currentPage} onPageChange={function (page: number): void {
                setCurrentPage(page);
            }}/>
        </div>
    )
}