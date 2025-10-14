"use client"

import {useState, ChangeEvent, FormEvent} from "react";
import {Button} from "@/app/Atoms/Button";
import {Card} from "@/app/Atoms/Card";
import { CiSearch } from "react-icons/ci";
import { LuWrench, LuMapPin } from "react-icons/lu";
import {useTranslations} from "next-intl";
import {InputWithIcon} from "@/app/Molecules/InputWithIcon";
import {useRouter} from "@/i18n/navigation";

export function MainPageSearchBar(){
    const t = useTranslations("MainPage");
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        router.push({
            pathname: "/search",
            query: {
                name: name,
                address: address,
                page: 1
            }
        });
    };

    return(
        <form onSubmit={onSubmit}>
            <Card className="w-[clamp(20rem,calc(100vw-var(--page-margin)*2),60rem)] !p-5 sm:p-[30] flex flex-col sm:flex-row">
                <InputWithIcon icon={<LuWrench className="text-accent4" size="18" strokeWidth={1}/>}
                               wrapperClassName="sm:flex-3 rounded-b-none sm:rounded-l-md sm:rounded-r-none"
                               className="w-full"
                               placeholder={t("searchBar1")}
                               value={name}
                               onChange={(e:ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
                <InputWithIcon icon={<LuMapPin className="text-accent4" size="18" strokeWidth={1}/>}
                               wrapperClassName="sm:flex-1 rounded-t-none sm:rounded-none"
                               className="w-full"
                               placeholder={t("searchBar2")}
                               value={address}
                               onChange={(e:ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                />
                <Button className="mt-2 sm:mt-0 sm:rounded-l-none"
                        icon={<CiSearch size="18" strokeWidth={1} />}
                        type="submit"
                >
                    {t("searchButton")}
                </Button>
            </Card>
        </form>
    )
}