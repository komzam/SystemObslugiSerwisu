"use client"

import {ReactNode, useEffect} from "react";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {useRouter} from "@/i18n/navigation";


type WorkerShopGuardProps = {
    children: ReactNode;
    fallbackUrl?: string;
};

export function WorkerShopGuard({children, fallbackUrl = "/noRepairShop"}: WorkerShopGuardProps) {
    const authContext = useAuthContext();
    const router = useRouter();

    const hasShop = authContext.authInfo?.__typename === "FullWorkerDto"
        && authContext.authInfo?.repairShop != null;

    useEffect(() => {
        if (!authContext.isLoading) {
            if (!hasShop) {
                router.replace(fallbackUrl);
            }
        }
    }, [authContext.isLoading, fallbackUrl, hasShop, router]);

    if (authContext.isLoading) return null;

    if (!hasShop) return null;

    return <>{children}</>;
}