"use client"

import {Card} from "@/components/Atoms/Card";
import {useTranslations} from "next-intl";
import {LabeledDropdown} from "@/components/Molecules/LabeledDropdown";
import {DropdownItems} from "@/components/Molecules/Dropdown";
import {useMemo, useState} from "react";
import {
    ChangePreferredContactMutation,
    ChangePreferredContactMutationVariables,
    ChangePreferredReturnMutation,
    ChangePreferredReturnMutationVariables,
    ContactMethod,
    ReturnMethod
} from "@/__generated__/types";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {CHANGE_PREFERRED_CONTACT} from "@/graphql/ChangePreferredContact";
import {useMutation} from "@apollo/client/react";
import {CHANGE_PREFERRED_RETURN} from "@/graphql/ChangePreferredReturn";

export function EditPreferences() {
    const t = useTranslations("EditAccount.preferences");
    const tcm = useTranslations("ContactMethods");
    const trm = useTranslations("ReturnMethods");
    const authContext = useAuthContext();
    const [contactMethod, setContactMethod] = useState<string>(authContext.authInfo?.__typename == "FullCustomerDto"? (authContext.authInfo?.preferredContactMethod?.toString()?? "NONE") : "NONE");
    const [returnMethod, setReturnMethod] = useState<string>(authContext.authInfo?.__typename == "FullCustomerDto"? (authContext.authInfo?.preferredReturnMethod?.toString()?? "NONE") : "NONE");

    const [changePreferredContact] = useMutation<ChangePreferredContactMutation, ChangePreferredContactMutationVariables>(CHANGE_PREFERRED_CONTACT);
    const [changePreferredReturn] = useMutation<ChangePreferredReturnMutation, ChangePreferredReturnMutationVariables>(CHANGE_PREFERRED_RETURN);

    const contactMethods : DropdownItems = useMemo(() => {
        const items: DropdownItems = [{values: []}];
        items[0].values.push({
            valueName: "NONE",
            valueLabel: tcm("none")
        });
        for (const key in ContactMethod) {
            if (ContactMethod.hasOwnProperty(key)) {
                const enumKey = key as keyof typeof ContactMethod;
                items[0].values.push({
                    valueName: ContactMethod[enumKey],
                    valueLabel: tcm(key)
                });
            }
        }
        return items;
    }, []);

    const returnMethods : DropdownItems = useMemo(() => {
        const items: DropdownItems = [{values: []}];
        items[0].values.push({
            valueName: "NONE",
            valueLabel: tcm("none")
        });
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

    const onContactMethodChange = async (newValue: string) =>{
        const newContactMethod = newValue == "NONE"? null : newValue as ContactMethod;
        try{
            await changePreferredContact({variables:{contactMethod: newContactMethod}})
        }catch(error){
            return;
        }
        setContactMethod(newValue);
    }

    const onReturnMethodChange = async (newValue: string) =>{
        const newReturnMethod = newValue == "NONE"? null : newValue as ReturnMethod;
        try{
            await changePreferredReturn({variables:{returnMethod: newReturnMethod}})
        }catch(error){
            return;
        }
        setReturnMethod(newValue);
    }

    return (
        <Card>
            <Card.Label>{t("title")}</Card.Label>
            <div className="bg-inherit flex flex-col gap-5">
                <LabeledDropdown placeholder={tcm("select")} items={contactMethods} label={t("preferredContactMethod")}
                    value={contactMethod}
                    onValueChange={onContactMethodChange}/>
                <LabeledDropdown placeholder={trm("select")} items={returnMethods} label={t("preferredReturnMethod")}
                    value={returnMethod}
                    onValueChange={onReturnMethodChange}/>
            </div>
        </Card>
    )
}