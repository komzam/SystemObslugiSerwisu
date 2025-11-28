import * as React from "react";
import {RepairsList} from "@/components/Organisms/RepairsList";
import {ProtectedRoute} from "@/components/Utils/ProtectedRoute";
import {useTranslations} from "next-intl";

export default function Repairs() {
    const t = useTranslations("MyRepairs");

    return (
        <ProtectedRoute>
            <div className="bg-inherit flex justify-center">
                <div className="flex flex-col gap-5 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                    <p className="text-larger1 font-bold">{t("myRepairs")}</p>
                    <RepairsList/>
                </div>
            </div>
        </ProtectedRoute>
    );
}
