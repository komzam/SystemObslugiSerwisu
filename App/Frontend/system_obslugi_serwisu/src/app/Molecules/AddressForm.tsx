import { useTranslations} from "next-intl";
import { LabeledTextInput } from "@/app/Molecules/LabeledTextInput";

export function AddressForm() {
    const t = useTranslations("Address");

    return(
        <div className="bg-inherit flex flex-col gap-5 w-full">
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="fullName" label={t("fullName")}/>
            <div className="bg-inherit flex flex-col sm:flex-row gap-5 w-full">
                <LabeledTextInput wrapperClassName="w-full sm:flex-1" className="w-full" id="streetName" label={t("streetName")}/>
                <div className="bg-inherit flex flex-row flex-1 gap-5">
                    <LabeledTextInput wrapperClassName="flex-1" className="w-full" id="buildingNumber" label={t("buildingNumber")}/>
                    <LabeledTextInput wrapperClassName="flex-1" className="w-full" id="aptNumber" label={t("aptNumber")}/>
                </div>
            </div>
            <div className="bg-inherit flex flex-row gap-5 w-full">
                <LabeledTextInput wrapperClassName="flex-1" className="w-full" id="postCode" label={t("postCode")}/>
                <LabeledTextInput wrapperClassName="flex-1" className="w-full" id="city" label={t("city")}/>
            </div>
        </div>
    )
}