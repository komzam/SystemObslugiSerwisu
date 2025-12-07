import {CurrencyCode} from "@/__generated__/types";
import {DropdownItems} from "@/components/Molecules/Dropdown";
import {useMemo} from "react";
import {DropdownWithLabelProps, LabeledDropdown} from "@/components/Molecules/LabeledDropdown";
import {useTranslations} from "next-intl";

type CurrencySelectProps = Omit<DropdownWithLabelProps,"label"|"placeholder"|"items"> & {
    value?: CurrencyCode;
    onChange?: (selected: CurrencyCode) => void;
}
export function CurrencySelect({value, onChange, ...props}: CurrencySelectProps) {
    const t = useTranslations("Common");
    const currencies : DropdownItems = useMemo(() => {
        const items: DropdownItems = [{values: []}];
        for (const key in CurrencyCode) {
            if (CurrencyCode.hasOwnProperty(key)) {
                const enumKey = key as keyof typeof CurrencyCode;
                items[0].values.push({
                    valueName: CurrencyCode[enumKey],
                    valueLabel: CurrencyCode[enumKey],
                });
            }
        }
        return items;
    }, []);

    return <LabeledDropdown label={t("currency")}
                            placeholder={t("currency")}
                            items={currencies}
                            defaultValue={value}
                            onValueChange={(value) => onChange?.(value as CurrencyCode)}
                            {...props}/>;
}