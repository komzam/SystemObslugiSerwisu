import {useTranslations} from "next-intl";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {LabeledDropdown} from "@/app/Molecules/LabeledDropdown";
import {DropdownItems} from "@/app/Molecules/Dropdown";
import {LabeledTextArea} from "@/app/Molecules/LabeledTextArea";


export function ContactInfoForm(){
    const t = useTranslations("RepairForm.additionalInfo")

    const contactMethods : DropdownItems = [
        {
            values:[
                {
                    valueName: "thisApp",
                    valueLabel: t("contactMethods.thisApp"),
                },
                {
                    valueName: "phoneCall",
                    valueLabel: t("contactMethods.phoneCall"),
                },
                {
                    valueName: "sms",
                    valueLabel: t("contactMethods.sms"),
                }
            ]
        }
    ]

    return (
        <div className="bg-inherit flex flex-col gap-5">
            <div className="bg-inherit flex flex-col md:flex-row gap-5 w-full">
                <LabeledTextInput wrapperClassName="w-full md:flex-1" className="w-full" id="email" label={t("email")}/>
                <LabeledTextInput wrapperClassName="w-full md:flex-1" className="w-full" id="phoneNumber" label={t("phoneNumber")}/>
            </div>
            <LabeledDropdown placeholder="Select" items={contactMethods} label={t("preferredContactMethod")}/>
        </div>
    )
}