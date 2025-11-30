import * as React from "react";
import {RSRegisterCard} from "@/components/Organisms/RSRegisterCard";
import {ProtectedRoute} from "@/components/Utils/ProtectedRoute";

export default function SignIn() {
    return (
        <ProtectedRoute mustBe={"loggedOut"} redirectTo={"/"}>
            <div className="h-screen flex items-center justify-center w-full">
                <div className="flex h-fit justify-center">
                    <RSRegisterCard/>
                </div>
            </div>
        </ProtectedRoute>
    );
}