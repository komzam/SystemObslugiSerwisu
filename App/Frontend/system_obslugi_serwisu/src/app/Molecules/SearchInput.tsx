import {InputWithIcon, InputWithIconProps} from "@/app/Molecules/InputWithIcon";
import {CiSearch} from "react-icons/ci";

export function SearchInput({icon, ...props} : InputWithIconProps) {
    return <InputWithIcon className="!p-0" icon={<CiSearch size="28" className="text-accent4"/>} {...props}></InputWithIcon>;
}