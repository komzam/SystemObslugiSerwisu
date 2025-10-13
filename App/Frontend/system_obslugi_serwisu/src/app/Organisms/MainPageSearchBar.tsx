import {TextInput} from "@/app/Atoms/TextInput";
import {Button} from "@/app/Atoms/Button";
import {Card} from "@/app/Atoms/Card";
import { CiSearch } from "react-icons/ci";
import { LuWrench, LuMapPin } from "react-icons/lu";
import {useTranslations} from "next-intl";
import {InputWithIcon} from "@/app/Molecules/InputWithIcon";

export function MainPageSearchBar(){
    const t = useTranslations("MainPage");
    return(
        <div>
            <Card className="w-[clamp(20rem,calc(100vw-var(--page-margin)*2),60rem)] !p-5 sm:p-[30] flex flex-col sm:flex-row">
                <InputWithIcon icon={<LuWrench className="text-accent4" size="18" strokeWidth={1}/>} wrapperClassName="sm:flex-3 rounded-b-none sm:rounded-l-md sm:rounded-r-none" className="w-full" placeholder={t("searchBar1")}/>
                <InputWithIcon icon={<LuMapPin className="text-accent4" size="18" strokeWidth={1}/>} wrapperClassName="sm:flex-1 rounded-t-none sm:rounded-none " className="w-full" placeholder={t("searchBar2")}/>
                <Button className="mt-2 sm:mt-0 sm:rounded-l-none" icon={<CiSearch size="18" strokeWidth={1} />}>{t("searchButton")}</Button>
            </Card>
        </div>
    )
}