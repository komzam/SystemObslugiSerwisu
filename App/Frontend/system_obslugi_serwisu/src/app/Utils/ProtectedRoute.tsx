"use client"

import {ReactNode, useEffect} from "react";
import {useAuthContext} from "@/app/Utils/AuthContext";
import {useRouter} from "@/i18n/navigation";

export type ProtectedRouteProps = {
    children: ReactNode;
    mustBe?: "loggedIn" | "loggedOut";
    redirectTo?: string;
}

export function ProtectedRoute({ children, mustBe="loggedIn", redirectTo="/signIn"}: ProtectedRouteProps) {
    const authContext = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if((!authContext.isLoggedIn && mustBe == "loggedIn") || (authContext.isLoggedIn && mustBe == "loggedOut"))
            router.replace(redirectTo);
    });

    if((!authContext.isLoggedIn && mustBe == "loggedIn") || (authContext.isLoggedIn && mustBe == "loggedOut"))
        return null;

    return <>{children}</>
}