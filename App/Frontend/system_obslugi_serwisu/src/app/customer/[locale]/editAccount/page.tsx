import {ProtectedRoute} from "@/app/Utils/ProtectedRoute";
import EditAccount from "@/app/Organisms/EditAccount"
import * as React from "react";

export default function EditAccountPage(){
    return (
        <ProtectedRoute>
            <div className="bg-inherit flex justify-center">
                <div className="flex flex-col gap-5 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                    <EditAccount.EditAccountDetails/>
                    <EditAccount.EditPreferences/>
                    <EditAccount.EditShippingAddress/>
                </div>
            </div>
        </ProtectedRoute>
    )
}