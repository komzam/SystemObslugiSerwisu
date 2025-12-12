import {Dropdown3, Dropdown3Item, Dropdown3Props} from "@/components/Molecules/Dropdown3";
import { useQuery } from "@apollo/client/react";
import {useTranslations} from "next-intl";
import {GetPartCategoriesQuery, GetPartCategoriesQueryVariables} from "@/__generated__/types";
import {GET_PART_CATEGORIES} from "@/graphql/GetPartCategories";
import {useMemo} from "react";

type PartCategoryDropdownProps = Omit<Dropdown3Props, "items"|"classNamePortal"|"placeholder">;
export function PartCategoryDropdown(props:PartCategoryDropdownProps) {
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