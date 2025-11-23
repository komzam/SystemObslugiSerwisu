import {useTranslations} from "next-intl";
import {PhoneInput} from "@/app/Molecules/PhoneInput";
import {ChangePhoneNumberMutationVariables} from "@/__generated__/types";

type ChangePhoneNumberKey = keyof ChangePhoneNumberMutationVariables;
export type ChangePhoneNumberChangeHandler = <K extends ChangePhoneNumberKey>(
    fieldName: K,
    value: ChangePhoneNumberMutationVariables[K]
) => void;

export type ChangePhoneNumberFormProps = {
    formData: ChangePhoneNumberMutationVariables;
    onFormChange: ChangePhoneNumberChangeHandler;
}

export function ChangePhoneNumberForm({formData, onFormChange}: ChangePhoneNumberFormProps) {
    const t = useTranslations("EditAccount.accountDetails");

    return (
        <div className="bg-inherit flex flex-col gap-5">
            <PhoneInput wrapperClassName="w-full" className="w-full" label={t("newPhoneNumber")} id="newPhoneNumber"
                        phone={formData.newPhoneNumber} onPhoneChange={(phone) => onFormChange("newPhoneNumber", phone)}
                        countryCode={formData.regionCode} onCountryChange={(countryCode) => onFormChange("regionCode", countryCode)}/>
        </div>
    )
}