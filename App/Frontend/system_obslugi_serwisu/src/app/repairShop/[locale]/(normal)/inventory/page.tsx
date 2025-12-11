"use client"

import {
    PartFilterInput, StockLevel
} from "@/__generated__/types";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "@/i18n/navigation";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import * as CardWithTabs from "@/components/Molecules/CardWithTabs";
import {useTranslations} from "next-intl";
import {AllParts} from "@/components/Organisms/Inventory/AllParts";
import {PartsToOrder} from "@/components/Organisms/Inventory/PartsToOrder";

export default function InventoryPage(){
    const t = useTranslations("PartList");
    const router = useRouter();
    const queryParams = useSearchParams();
    const pathname = usePathname();
    const {page:queryPage, tab:queryTab, filter:queryFilter} = loadQueryParams(queryParams);
    const [selectedPage, setSelectedPage] = useState<number>(queryPage??1);
    const [filter, setFilter] = useState<PartFilterInput>(queryFilter);
    const [selectedTab, setSelectedTab] = useState<string>(queryTab||"allParts");
    useEffect(()=>{
        router.push(
            {
                pathname: pathname,
                query: createQueryParams(selectedPage, selectedTab, filter)
            }
        );
    }, [selectedPage, selectedTab, filter]);

    const onTabChange = (newTab: string) =>{
        setSelectedTab(newTab);
        setSelectedPage(1);
        setFilter({});
    };

    return (
        <div className="min-w-240 max-w-600">
            <CardWithTabs.Root defaultTabName={selectedTab} onValueChange={onTabChange}>
                <CardWithTabs.TabsList>
                    <CardWithTabs.Trigger buttonText={t("allParts")} tabName="allParts"/>
                    <CardWithTabs.Trigger buttonText={t("partsToOrder")} tabName="partsToOrder"/>
                    <CardWithTabs.Trigger buttonText={t("purchaseOrders")} tabName="purchaseOrders"/>
                </CardWithTabs.TabsList>
                <CardWithTabs.Content tabName="allParts">
                    <AllParts
                        selectedPage={selectedPage}
                        onPageChange={setSelectedPage}
                        filter={filter}
                        onFilterChange={(filter) => setFilter(filter)}
                    />
                </CardWithTabs.Content>
                <CardWithTabs.Content tabName="partsToOrder">
                    <PartsToOrder
                        selectedPage={selectedPage}
                        onPageChange={setSelectedPage}
                    />
                </CardWithTabs.Content>
                <CardWithTabs.Content tabName="purchaseOrders">

                </CardWithTabs.Content>
            </CardWithTabs.Root>
        </div>
    );
}

const createQueryParams = (pageNumber: number, tab: string, filter: PartFilterInput) => {
    return {
        page: pageNumber,
        tab: tab,
        ...(filter.searchTerm && { search: filter.searchTerm}),
        ...(filter.categories && { category: filter.categories.join(",") }),
        ...(filter.stockLevels && { stockLevel: filter.stockLevels.join(",") })
    };
};

const loadQueryParams = (params:ReadonlyURLSearchParams) => {
    const queryParams = Object.fromEntries(params.entries());
    const page = Number(queryParams.page) || 1;
    const tab = queryParams.tab || "";
    const categories = queryParams.category? queryParams.category.split(",") : null;
    const stockLevels = queryParams.stockLevels? queryParams.stockLevels.split(",") : null;
    const searchTerm = queryParams?.search;
    const filter: PartFilterInput = {
        categories: categories as string[],
        stockLevels: stockLevels as StockLevel[],
        searchTerm: searchTerm
    }
    return {page: page, tab: tab, filter: filter};
};