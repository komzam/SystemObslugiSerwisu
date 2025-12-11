import {
    GetPartCategoriesQuery, GetPartCategoriesQueryVariables,
    GetPartsQuery,
    GetPartsQueryVariables,
    PartFilterInput,
    StockLevel
} from "@/__generated__/types";
import {useTranslations} from "next-intl";
import {KeyboardEventHandler, useEffect, useMemo, useState} from "react";
import {useDebounce} from "@/components/Hooks/useDebounce";
import {Dropdown3, Dropdown3Item, Dropdown3Props} from "@/components/Molecules/Dropdown3";
import {SearchInput} from "@/components/Molecules/SearchInput";
import {useQuery} from "@apollo/client/react";
import {GET_PARTS} from "@/graphql/GetParts";
import {RSPartList} from "@/components/Organisms/RSPartList";
import {GET_PART_CATEGORIES} from "@/graphql/GetPartCategories";
import {Button} from "@/components/Atoms/Button";
import * as React from "react";
import DialogWindow from "@/components/Molecules/DialogWindow";
import {LabeledTextInput} from "@/components/Molecules/LabeledTextInput";
import {ErrorName} from "@/components/Utils/ErrorName";
import {useToast} from "@/components/Utils/ToastNotifications";
import {Dropdown, DropdownItems, DropdownProps} from "@/components/Molecules/Dropdown";
import {LabeledDropdown} from "@/components/Molecules/LabeledDropdown";


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

    const onAddPartSuccess = () => {
        try{
            refetch();
        }catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <SearchBar filter={filter} onFilterChange={onFilterChange} onAddPartSuccess={onAddPartSuccess}/>
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
    onAddPartSuccess: () => void;
};
const SearchBar = ({filter, onFilterChange, onAddPartSuccess}:SearchBarProps) => {
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
                <AddPart onSuccess={onAddPartSuccess}/>
                <CategoryDropdown initialSelected={categories} onListUpdate={onCategoryFilterChange}/>
                <StockLevelDropdown initialSelected={stockLevels} onListUpdate={onStockLevelFilterChange}/>
            </div>
        </div>
    );
};

type StockLevelDropdownProps = Omit<Dropdown3Props, "items"|"classNamePortal"|"placeholder">;
function StockLevelDropdown(props:StockLevelDropdownProps) {
    const tPartList = useTranslations("PartList");
    const tStockLevel = useTranslations("StockLevel");
    const stockLevels : Dropdown3Item[] = useMemo(() => {
        const items: Dropdown3Item[] = [];
        for (const key in StockLevel) {
            if (StockLevel.hasOwnProperty(key)) {
                const enumKey = key as keyof typeof StockLevel;
                items.push({
                    value: StockLevel[enumKey],
                    label: tStockLevel(StockLevel[enumKey])
                });
            }
        }
        return items;
    }, []);

    return <Dropdown3 classNamePortal="max-h-80"
                      items={stockLevels}
                      placeholder={tPartList("stock")}
                      {...props}
    />
}

type CategoryDropdownProps = Omit<Dropdown3Props, "items"|"classNamePortal"|"placeholder">;
function CategoryDropdown(props:CategoryDropdownProps) {
    const tPartList = useTranslations("PartList");
    const {data} = useQuery<GetPartCategoriesQuery, GetPartCategoriesQueryVariables>(GET_PART_CATEGORIES);

    const categories : Dropdown3Item[] = useMemo(() => {
        const items: Dropdown3Item[] = [];
        for (const category of data?.partCategories??[]) {
            items.push({
                value: category.id,
                label: category.name
            });
        }
        return items;
    }, [data]);

    return <Dropdown3 classNamePortal="max-h-80"
                      items={categories}
                      placeholder={tPartList("category")}
                      {...props}
    />
}

type CategorySelectProps = Omit<DropdownProps, "items"|"classNamePortal"|"placeholder">;

class DropdownItem {
}

function CategorySelect(props:CategorySelectProps) {
    const tPartList = useTranslations("PartList");
    const {data} = useQuery<GetPartCategoriesQuery, GetPartCategoriesQueryVariables>(GET_PART_CATEGORIES);

    const categories : DropdownItems = useMemo(() => {
        const items: DropdownItems = [{values:[]}];
        for (const category of data?.partCategories??[]) {
            items[0].values.push({
                valueName: category.id,
                valueLabel: category.name
            });
        }
        return items;
    }, [data]);

    return <LabeledDropdown classNamePortal="max-h-80 z-[51]"
                            label={tPartList("category")}
                            items={categories}
                            placeholder={tPartList("category")}
                            {...props}
    />
}


type AddPartForm = {
    partName: string;
    manufacturerCode: string;
    category: string;
    initialStock: number|"";
    price: number|"";
    lowStockThreshold: number|"";
}
const defaultAddPartForm : AddPartForm = {
    partName: "",
    manufacturerCode: "",
    category: "",
    initialStock: "",
    price: "",
    lowStockThreshold: ""
}

type AddPartProps = {
    onSuccess: () => void;
}
function AddPart({onSuccess}: AddPartProps) {
    const t = useTranslations("PartList");
    const tErr = useTranslations("Errors");
    const toasts = useToast();
    const [addPartForm, setAddPartForm] = useState<AddPartForm>(defaultAddPartForm);

    const editForm = <K extends keyof AddPartForm>(key: K, value: AddPartForm[K]) => {
        setAddPartForm((prev) => ({...prev, [key]: value}));
    }

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        if(!Object.values(addPartForm).every(value => value !== "")){
            e.preventDefault();
            return;
        }

        try{
            console.log(addPartForm);
            console.log("ADD PART")
            onSuccess();
        }catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }

    }

    const cleanVariables = () => {
        setAddPartForm(defaultAddPartForm);
    }

    return (
        <DialogWindow.Root>
            <DialogWindow.Trigger asChild>
                <Button>{t("addPart")}</Button>
            </DialogWindow.Trigger>
            <DialogWindow.Window aria-describedby="" className="w-2xl" onCloseAutoFocus={cleanVariables}>
                <DialogWindow.Title>{t("addPart")}</DialogWindow.Title>

                <div className="bg-inherit grid grid-cols-3 gap-4">
                    <LabeledTextInput
                        wrapperClassName="w-full col-span-3" className="w-full"
                        label={t("partName")}
                        id="partName"
                        value={addPartForm.partName}
                        onChange={(e) => editForm("partName", e.target.value)}
                    />
                    <LabeledTextInput
                        wrapperClassName="w-full col-span-3" className="w-full"
                        label={t("manufacturerCode")}
                        id="manufacturerCode"
                        value={addPartForm.manufacturerCode}
                        onChange={(e) => editForm("manufacturerCode", e.target.value)}
                    />
                    <CategorySelect
                        classNameTrigger="col-start-1 col-end-2"
                        onValueChange={(value) => editForm("category", value)}
                    />
                    <LabeledTextInput
                        wrapperClassName="w-full col-span-1 col-start-1" className="w-full"
                        type="number"
                        label={t("initialStock")}
                        id="initialStock"
                        value={addPartForm.initialStock}
                        onChange={(e) => editForm("initialStock", Number(e.target.value)||"")}
                    />
                    <LabeledTextInput
                        wrapperClassName="w-full col-span-1" className="w-full"
                        label={t("price")}
                        id="newPartPrice"
                        value={addPartForm.price}
                        onChange={(e) => editForm("price", Number(e.target.value)||"")}
                    />
                    <LabeledTextInput
                        wrapperClassName="w-full col-span-1" className="w-full"
                        label={t("lowStockThreshold")}
                        id="lowStockThreshold"
                        value={addPartForm.lowStockThreshold}
                        onChange={(e) => editForm("lowStockThreshold", Number(e.target.value)||"")}
                    />
                    <Button className="col-span-1 col-start-3 ml-auto w-fit"
                            onClick={onSubmit}
                            disabled={!Object.values(addPartForm).every(value => value !== "")}
                    >
                        {t("addPart")}
                    </Button>
                </div>

            </DialogWindow.Window>
        </DialogWindow.Root>
    );
}