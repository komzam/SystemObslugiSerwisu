import * as React from "react";
import {SignInCard} from "@/app/Organisms/SignInCard";
import {ProtectedRoute} from "@/app/Utils/ProtectedRoute";

type SignInProps ={
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SignIn({searchParams}: SignInProps) {
    const callback = (await searchParams)?.callbackUrl?.toString();

    return (
        <ProtectedRoute mustBe={"loggedOut"} redirectTo={callback? callback:"/"}>
            <div className="h-screen flex items-center justify-center w-full">
                <div className="flex h-fit justify-center">
                    <SignInCard/>
                </div>
            </div>
        </ProtectedRoute>
    );
}