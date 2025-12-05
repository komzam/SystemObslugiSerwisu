import {RepairFilterInput, RepairStatus, ReturnMethod} from "@/__generated__/types";
import {RsListCell, RSListRow} from "@/components/Molecules/RSList/RSListRow";
import {RSListHeader, RsListHeaderCell} from "@/components/Molecules/RSList/RSListHeader";
import {Card} from "@/components/Atoms/Card";
import {RSList} from "@/components/Molecules/RSList/RSList";
import {PageSelector} from "@/components/Molecules/PageSelector";
import {useTranslations} from "next-intl";
import {SearchInput} from "@/components/Molecules/SearchInput";
import {Dropdown, DropdownItems} from "@/components/Molecules/Dropdown";
import {useDebounce} from "@/components/Hooks/useDebounce";
import {KeyboardEventHandler, useEffect, useMemo, useState} from "react";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {Dropdown3, Dropdown3Item} from "@/components/Molecules/Dropdown3";
import {UUID} from "node:crypto";

export type RepairListRepair = {
    id: string,
    ticketNumber: string,
    customer: {
        name: string,
    }
    deviceInfo: {
        model: string,
        manufacturer: string,
    },
    status: RepairStatus,
    technician?: string,
    createdAt: Date
}

export type RSRepairListProps = {
    repairs: RepairListRepair[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    filter: RepairFilterInput;
    onFilterChange: (newFilter: RepairFilterInput) => void;
    isLoading: boolean;
}

export function RSRepairList({repairs, currentPage, totalPages, onPageChange, filter, onFilterChange, isLoading=false}: RSRepairListProps) {
    const t = useTranslations("RepairList");

    const headerCells:RsListHeaderCell[] = [
        {title:t("ticketNumber")},
        {title:t("customer")},
        {title:t("device")},
        {title:t("status")},
        {title:t("technician")},
        {title:t("createdAt")},
        {title:t("actions")}
    ]

    return(
        <div className="flex flex-col w-full">
            <Card className="w-full flex flex-col gap-5">
                <SearchBar filter={filter} onFilterChange={onFilterChange} />
                {isLoading? <LoadingIcon/>:
                    <RSList columns={[{width:"1fr"},{width:"1.5fr"},{width:"1.5fr"},{width:"1fr"},{width:"1fr"},{width:"1fr"},{width:"auto"}]}>
                        <RSListHeader cells={headerCells}/>
                        {repairs.map((repair, repairIndex) => {
                            const cells: RsListCell[] = [
                                {kind: "textBold", content: repair.ticketNumber},
                                {kind: "text", content: repair.customer.name},
                                {kind: "text", content: repair.deviceInfo.manufacturer + " " + repair.deviceInfo.model},
                                {kind: "repairStatus", content: repair.status},
                                {kind: "text", content: repair.technician??t("unassigned")},
                                {kind: "text", content: repair.createdAt.toLocaleDateString()},
                                {kind: "link", content: t("viewDetails"), href:`/repair/${repair.id}`},
                            ];

                            return <RSListRow key={repairIndex} cells={cells} separator={repairIndex < repairs.length - 1}/>;
                        })}
                    </RSList>
                }
                <div className="flex w-full justify-end">
                    <PageSelector currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
                </div>
            </Card>
        </div>
    )
}


type SearchBarProps = {
    filter: RepairFilterInput;
    onFilterChange: (newFilters: RepairFilterInput) => void;
};
const SearchBar = ({filter, onFilterChange}:SearchBarProps) => {
    const t = useTranslations("RepairList");
    const tStatus = useTranslations("Status");
    const [searchText, setSearchText] = useState<string>(filter.searchTerm??"");
    const [statusList, setStatusList] = useState<RepairStatus[]>(filter.statuses??[]);
    const debouncedText = useDebounce(searchText);
    const debouncedStatus = useDebounce(statusList,300);

    useEffect(() => {
        if(debouncedText == (filter.searchTerm??"")) return;
        searchButtonClick();
    }, [debouncedText]);

    useEffect(() =>{
        const filterStatus = (filter.statuses??[]);
        if(filterStatus.length === debouncedStatus.length && debouncedStatus.every(item => filterStatus.includes(item))) return;

        if(debouncedStatus.length > 0){
            onFilterChange({...filter, statuses: debouncedStatus});
        }else{
            onFilterChange({...filter, statuses: null});
        }
    }, [debouncedStatus]);

    const searchButtonClick = () => {
        onFilterChange({...filter, searchTerm: searchText});
    }

    const searchBarClick: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(event.key === "Enter") {
            searchButtonClick();
        }
    };

    const onStatusFilterChange = (selectedValues: string[]) => {
        setStatusList(selectedValues as RepairStatus[]);
    }

    const statuses : Dropdown3Item[] = useMemo(() => {
        const items: Dropdown3Item[] = [];
        for (const key in RepairStatus) {
            if (RepairStatus.hasOwnProperty(key)) {
                const enumKey = key as keyof typeof RepairStatus;
                items.push({
                    value: RepairStatus[enumKey],
                    label: tStatus(RepairStatus[enumKey])
                });
            }
        }
        return items;
    }, []);

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3">
                <SearchInput placeholder={t("search")} value={searchText} onKeyDown={searchBarClick}
                             onChange={(e) => setSearchText(e.target.value)}/>
                {/*<Button onClick={searchButtonClick} icon={<LuSearch/>}/>*/}
            </div>
            <Dropdown3 classNamePortal="max-h-80" items={statuses} placeholder={t("status")} initialSelected={statusList} onListUpdate={onStatusFilterChange}/>
        </div>
    );
};