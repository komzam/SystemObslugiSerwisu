"use client"

import * as React from "react";
import {Card} from "@/components/Atoms/Card";
import {useTranslations} from "next-intl";
import {LuWrench} from "react-icons/lu";
import {Button} from "@/components/Atoms/Button";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {useRouter} from "@/i18n/navigation";

export default function NoRepairShopPage(){
    const t = useTranslations("NoRepairShop");
    const authContext = useAuthContext();
    const router = useRouter();

    const onLogout = () => {
        authContext.logout();
        router.replace("/signIn");
    }

    return (
        <div className="h-screen flex items-center justify-center w-full">
            <div className="flex h-fit justify-center">
                <Card className="flex flex-col items-center">
                    <LuWrench size="3rem" />
                    <span className="font-bold text-larger2 text-center">
                        {t("title")}
                    </span>
                    <Button onClick={onLogout} className="mt-10 w-full">{t("logOut")}</Button>
                </Card>
            </div>
        </div>
    );
}