import { useTranslations } from "next-intl";
import {DropdownItems, DropdownProps} from "../../Molecules/Dropdown";
import {useQuery} from "@apollo/client/react";
import {GetPartCategoriesQuery, GetPartCategoriesQueryVariables} from "@/__generated__/types";
import {GET_PART_CATEGORIES} from "@/graphql/GetPartCategories";
import {useMemo} from "react";
import {LabeledDropdown} from "@/components/Molecules/LabeledDropdown";

type PartCategorySelectProps = Omit<DropdownProps, "items"|"classNamePortal"|"placeholder">;

export function PartCategorySelect(props:PartCategorySelectProps) {
    const t = useTranslations("Common");
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
                            label={t("category")}
                            items={categories}
                            placeholder={t("category")}
                            {...props}
    />
}