import * as React from "react";
import {SignInCard} from "@/app/Organisms/SignInCard";
import {ProtectedRoute} from "@/app/Utils/ProtectedRoute";

export default function SignIn() {
    return (
        <ProtectedRoute mustBe={"loggedOut"} redirectTo={"/"}>
            <div className="flex justify-center ">
                <SignInCard/>
            </div>
        </ProtectedRoute>
    );
}