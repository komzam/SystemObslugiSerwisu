import {Card} from "@/app/Atoms/Card";
import {useTranslations} from "next-intl";
import {LabeledDropdown} from "@/app/Molecules/LabeledDropdown";
import {DropdownItems} from "@/app/Molecules/Dropdown";
import {useMemo} from "react";
import {ContactMethod, ReturnMethod} from "@/__generated__/types";

export function EditPreferences() {
    const t = useTranslations("EditAccount.preferences");
    const tcm = useTranslations("ContactMethods");
    const trm = useTranslations("ReturnMethods");

    const contactMethods : DropdownItems = useMemo(() => {
        const items: DropdownItems = [{values: []}];
        let i = 0;
        for (const key in ContactMethod) {
            if (ContactMethod.hasOwnProperty(key)) {
                const enumKey = key as keyof typeof ContactMethod;
                items[0].values.push({
                    valueName: ContactMethod[enumKey],
                    valueLabel: tcm(key)
                });
                i++;
            }
        }
        return items;
    }, []);

    const returnMethods : DropdownItems = useMemo(() => {
        const items: DropdownItems = [{values: []}];
        for (const key in ReturnMethod) {
            if (ReturnMethod.hasOwnProperty(key)) {
                const enumKey = key as keyof typeof ReturnMethod;
                items[0].values.push({
                    valueName: ReturnMethod[enumKey],
                    valueLabel: trm(key)
                });
            }
        }
        return items;
    }, []);

    return (
        <Card>
            <Card.Label>{t("title")}</Card.Label>
            <div className="bg-inherit flex flex-col gap-5">
                <LabeledDropdown placeholder={"Select"} items={contactMethods} label={t("preferredContactMethod")}/>
                <LabeledDropdown placeholder={"Select"} items={returnMethods} label={t("preferredReturnMethod")}/>
            </div>
        </Card>
    )
}