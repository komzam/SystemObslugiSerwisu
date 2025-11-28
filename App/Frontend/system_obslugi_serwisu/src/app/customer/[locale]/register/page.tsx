import * as React from "react";
import {RegisterCard} from "@/components/Organisms/RegisterCard";
import {ProtectedRoute} from "@/components/Utils/ProtectedRoute";

export default function SignIn() {
    return (
        <ProtectedRoute mustBe={"loggedOut"} redirectTo={"/"}>
            <div className="flex justify-center ">
                <RegisterCard/>
            </div>
        </ProtectedRoute>
    );
}