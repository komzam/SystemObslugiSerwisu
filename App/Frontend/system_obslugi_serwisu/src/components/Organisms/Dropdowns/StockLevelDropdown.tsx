import {Dropdown3, Dropdown3Item, Dropdown3Props} from "@/components/Molecules/Dropdown3";
import {useTranslations} from "next-intl";
import {useMemo} from "react";
import {StockLevel} from "@/__generated__/types";

type StockLevelDropdownProps = Omit<Dropdown3Props, "items"|"classNamePortal"|"placeholder">;
export function StockLevelDropdown(props:StockLevelDropdownProps) {
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