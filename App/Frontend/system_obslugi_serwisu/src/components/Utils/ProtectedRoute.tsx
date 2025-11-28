"use client"

import {ReactNode, useEffect} from "react";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {usePathname, useRouter} from "@/i18n/navigation";
import {useSearchParams} from "next/navigation";

export type ProtectedRouteProps = {
    children: ReactNode;
    mustBe?: "loggedIn" | "loggedOut";
    redirectTo?: string;
}

export function ProtectedRoute({ children, mustBe="loggedIn", redirectTo="/signIn"}: ProtectedRouteProps) {
    const authContext = useAuthContext();
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if(!authContext.isLoading) {
            if ((!authContext.isLoggedIn && mustBe == "loggedIn") || (authContext.isLoggedIn && mustBe == "loggedOut")){
                if(redirectTo == "/signIn"){
                    const currentPath = searchParams.toString()
                        ? `${pathname}?${searchParams.toString()}`
                        : pathname

                    const encodedCallback = encodeURIComponent(currentPath)

                    router.push(`/signIn?callbackUrl=${encodedCallback}`)
                }else{
                    router.replace(redirectTo);
                }
            }
        }
    }, [authContext.isLoading]);

    if(authContext.isLoading) return null;
    if((!authContext.isLoggedIn && mustBe == "loggedIn") || (authContext.isLoggedIn && mustBe == "loggedOut"))
        return null;

    return <>{children}</>
}