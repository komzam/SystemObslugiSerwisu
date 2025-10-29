import * as React from "react";
import {RepairsList} from "@/app/Organisms/RepairsList";
import {ProtectedRoute} from "@/app/Utils/ProtectedRoute";

export default function Repairs() {
    return (
        <ProtectedRoute>
        <div className="bg-inherit flex justify-center">
            <div className="flex flex-col gap-5 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                <p className="text-larger1 font-bold">My Repairs</p>
                <RepairsList/>
            </div>
        </div>
        </ProtectedRoute>
    );
}
