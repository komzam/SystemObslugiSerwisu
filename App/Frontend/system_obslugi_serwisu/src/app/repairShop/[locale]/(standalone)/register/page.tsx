import * as React from "react";
import {RegisterCard} from "@/components/Organisms/RegisterCard";
import {ProtectedRoute} from "@/components/Utils/ProtectedRoute";

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