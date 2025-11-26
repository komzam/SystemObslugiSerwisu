import * as React from "react";
import {RegisterCard} from "@/app/Organisms/RegisterCard";
import {ProtectedRoute} from "@/app/Utils/ProtectedRoute";

export default function SignIn() {
    return (
        <ProtectedRoute mustBe={"loggedOut"} redirectTo={"/"}>
            <div className="h-screen flex items-center justify-center w-full">
                <div className="flex h-fit justify-center">
                    <RegisterCard/>
                </div>
            </div>
        </ProtectedRoute>
    );
}