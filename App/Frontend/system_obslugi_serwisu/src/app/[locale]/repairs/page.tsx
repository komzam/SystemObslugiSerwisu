import * as React from "react";
import {RepairItem} from "@/app/Molecules/RepairItem";

export default function Repairs() {
    return (
        <div className="p-[var(--page-margin)] bg-inherit flex justify-center">
            <div className="flex flex-col gap-5 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),60rem)]">
                <p className="text-larger1 font-bold">My Repairs</p>
                <RepairItem title="Playstation 5" repairTicketNumber={123456789} description={"The fan is super loud"}></RepairItem>
            </div>
        </div>
    );
}
