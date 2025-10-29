import {getCountries, getCountryCallingCode} from "libphonenumber-js";
import {LabeledDropdown} from "./LabeledDropdown";
import {DropdownItems} from "@/app/Molecules/Dropdown";
import {LabeledTextInput} from "@/app/Molecules/LabeledTextInput";
import {useMemo} from "react";

const getCountryCodes = ():DropdownItems => {
    const dropDownItems :DropdownItems = [{values:[]}];
    const countries = getCountries();
    for(const country of countries){
        dropDownItems[0].values.push({
            valueName: country,
            valueLabel: `${country} (+${getCountryCallingCode(country)})`
        });
    }

    return dropDownItems;
};


export type PhoneInputProps = {
    countryCode?: string;
    onCountryChange?: (countryCode: string) => void;
    phone?: string;
    onPhoneChange?: (phone: string) => void;
    wrapperClassName?: string;
    className?: string;
    id: string;
    label: string;
    required?: boolean;
}
export function PhoneInput({countryCode, onCountryChange, phone, onPhoneChange, wrapperClassName="", className="", id, label, required=false}: PhoneInputProps) {

    const memoizedCountryItems = useMemo(() => getCountryCodes(), []);

    return(
        <div className={`bg-inherit flex flex-row items-end gap-3 ${wrapperClassName}`}>
            <LabeledDropdown defaultValue="PL" classNamePortal="max-h-80" label="" placeholder="" items={memoizedCountryItems}
            value={countryCode || "PL"} onValueChange={(value) => onCountryChange && onCountryChange(value)}/>
            <LabeledTextInput wrapperClassName="flex-1" className={`w-full ${className}`} id={id} label={label} required={required}
            value={phone} onChange={(e) => onPhoneChange && onPhoneChange(e.target.value)}/>
        </div>
    )
}