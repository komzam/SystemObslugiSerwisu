import { CiSearch } from "react-icons/ci";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    placeholder?: string;
};

export function SearchInput({placeholder, ...props}: InputProps) {

    const states = {
        normal: "border-2 border-secondary rounded-md text-regular w-min",
        focused: "focus:border-primary focus:outline-0",
        disabled: "disabled:border-accent3"
    };


    return (
        <div className={`flex flex-row gap-1 ${states["normal"]} ${states["focused"]} ${states["disabled"]}`}>
            <CiSearch size="28" className="text-accent4"/>
            <input className="pl-1 focus:outline-0 placeholder-accent4"
                   placeholder= {placeholder != undefined ? placeholder : "Text"}
                   {...props} />
        </div>
    );
}