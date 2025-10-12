import * as React from "react";
import {RegisterCard} from "@/app/Organisms/RegisterCard";
import {ProtectedRoute} from "@/app/Utils/ProtectedRoute";

export default function SignIn() {
    return (
        <ProtectedRoute mustBe={"loggedOut"} redirectTo={"/"}>
            <div className="p-[var(--page-margin)] flex justify-center ">
                <RegisterCard/>
            </div>
        </ProtectedRoute>
    );
}