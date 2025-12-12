import {
    AddPartMutation, AddPartMutationVariables,
    AddPartRequestInput,
    GetPartsQuery,
    GetPartsQueryVariables,
    PartFilterInput,
    StockLevel
} from "@/__generated__/types";
import {useTranslations} from "next-intl";
import {KeyboardEventHandler, useEffect, useState} from "react";
import {useDebounce} from "@/components/Hooks/useDebounce";
import {SearchInput} from "@/components/Molecules/SearchInput";
import {useMutation, useQuery} from "@apollo/client/react";
import {GET_PARTS} from "@/graphql/GetParts";
import {RSPartList} from "@/components/Organisms/Inventory/RSPartList";
import * as React from "react";
import {ErrorName} from "@/components/Utils/ErrorName";
import {useToast} from "@/components/Utils/ToastNotifications";
import {PartCategoryDropdown} from "@/components/Organisms/Dropdowns/PartCategoryDropdown";
import {AddCategory} from "@/components/Organisms/Inventory/CategoryList/AddCategoryModal";
import {StockLevelDropdown} from "@/components/Organisms/Dropdowns/StockLevelDropdown";
import {AddPart} from "@/components/Organisms/Inventory/AddPartModal";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/Atoms/Button";
import {ADD_PART} from "@/graphql/AddPart";

type AllPartsProps = {
    selectedPage: number;
    onPageChange: (page: number) => void;
    filter: PartFilterInput;
    onFilterChange: (filter: PartFilterInput) => void;
}
export function AllParts({selectedPage, onPageChange, filter, onFilterChange}: AllPartsProps) {
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const {
        data,
        loading,
        refetch
    } = useQuery<GetPartsQuery, GetPartsQueryVariables>(GET_PARTS, {
        variables: {
            pageNumber: selectedPage,
            pageSize: 10,
            filter: filter
        }
    });

    const [addPart] = useMutation<AddPartMutation, AddPartMutationVariables>(ADD_PART);

    const onAddPart = async (addPartForm: AddPartRequestInput) => {
        try{
            await addPart({variables: {request: addPartForm}});
            await refetch();
        }catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }



    return (
        <div className="flex flex-col gap-5">
            <SearchBar filter={filter} onFilterChange={onFilterChange} onAdd={onAddPart}/>
            <RSPartList
                parts={data?.parts.items??[]}
                currentPage={selectedPage}
                onPageChange={onPageChange}
                totalPages={data?.parts.totalPages??1}
                isLoading={loading}
                onDelete={(id) => console.log(id)}
            />
        </div>
    );
}

type SearchBarProps = {
    filter: PartFilterInput;
    onFilterChange: (newFilters: PartFilterInput) => void;
    onAdd: (addPartForm: AddPartRequestInput) => void;
};

const SearchBar = ({filter, onFilterChange, onAdd}:SearchBarProps) => {
    const t = useTranslations("PartList");
    const [searchText, setSearchText] = useState<string>(filter.searchTerm??"");
    const [stockLevels, setStockLevels] = useState<StockLevel[]>(filter.stockLevels??[]);
    const [categories, setCategories] = useState<string[]>(filter.categories??[]);
    const debouncedText = useDebounce(searchText);
    const debouncedStockLevels = useDebounce(stockLevels,300);
    const debouncedCategories = useDebounce(categories,300);

    useEffect(() => {
        if(debouncedText == (filter.searchTerm??"")) return;
        searchButtonClick();
    }, [debouncedText]);

    useEffect(() =>{
        const filterStockLevels = (filter.stockLevels??[]);
        if(filterStockLevels.length === debouncedStockLevels.length
            && debouncedStockLevels.every(item => filterStockLevels.includes(item))) return;

        if(debouncedStockLevels.length > 0){
            onFilterChange({...filter, stockLevels: debouncedStockLevels});
        }else{
            onFilterChange({...filter, stockLevels: null});
        }
    }, [debouncedStockLevels]);

    useEffect(() =>{
        const filterCategories = (filter.categories??[]);
        if(filterCategories.length === debouncedCategories.length
            && debouncedCategories.every(item => filterCategories.includes(item))) return;

        if(debouncedCategories.length > 0){
            onFilterChange({...filter, categories: debouncedCategories});
        }else{
            onFilterChange({...filter, categories: null});
        }
    }, [debouncedCategories]);

    const searchButtonClick = () => {
        onFilterChange({...filter, searchTerm: searchText});
    }

    const searchBarClick: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(event.key === "Enter") {
            searchButtonClick();
        }
    };

    const onStockLevelFilterChange = (selectedValues: string[]) => {
        setStockLevels(selectedValues as StockLevel[]);
    }

    const onCategoryFilterChange = (selectedValues: string[]) => {
        setCategories(selectedValues);
    }

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3">
                <SearchInput placeholder={t("search")} value={searchText} onKeyDown={searchBarClick}
                             onChange={(e) => setSearchText(e.target.value)}/>
                {/*<Button onClick={searchButtonClick} icon={<LuSearch/>}/>*/}
            </div>
            <div className="flex flex-row gap-3">
                <AddPart onAdd={onAdd}/>
                <Link href={"/inventory/categories"}><Button>{t("manageCategories")}</Button></Link>
                <PartCategoryDropdown initialSelected={categories} onListUpdate={onCategoryFilterChange}/>
                <StockLevelDropdown initialSelected={stockLevels} onListUpdate={onStockLevelFilterChange}/>
            </div>
        </div>
    );
};