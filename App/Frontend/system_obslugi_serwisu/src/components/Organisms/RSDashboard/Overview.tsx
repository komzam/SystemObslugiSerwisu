import {Card} from "@/components/Atoms/Card";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend, ChartData
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {useMemo} from "react";
import {useTranslations} from "next-intl";

export type OverviewProps = {
    awaitingDiagnosis: number;
    awaitingRepair: number;
    awaitingShipping: number;
    readyForPickup: number;
    complaint: number;
    className?: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Overview({ awaitingDiagnosis, awaitingRepair, awaitingShipping, readyForPickup, complaint, className="" }: OverviewProps) {
    const t = useTranslations("Status");

    const data: ChartData<"doughnut"> = useMemo(()=>({
        labels: [
            t("AWAITING_DIAGNOSIS"),
            t("AWAITING_REPAIR"),
            t("AWAITING_SHIPPING"),
            t("READY_FOR_PICKUP"),
            t("COMPLAINT")
        ],
        datasets: [
            {
                label: "Overview",
                data: [awaitingDiagnosis, awaitingRepair, awaitingShipping, readyForPickup, complaint],
                backgroundColor: [
                    "oklch(62.3% 0.214 259.815)", //blue-500
                    "oklch(79.5% 0.184 86.047)", //yellow-500
                    "oklch(76.8% 0.233 130.85)", //lime-500
                    "oklch(72.3% 0.219 149.579)", //green-500
                    "oklch(63.7% 0.237 25.331)" //red-500
                ],
                borderColor: [
                    "oklch(54.6% 0.245 262.881)", //blue-600
                    "oklch(68.1% 0.162 75.834)", //yellow-600
                    "oklch(64.8% 0.2 131.684)", //lime-600
                    "oklch(62.7% 0.194 149.214)", //green-600
                    "oklch(57.7% 0.245 27.325)" //red-600
                ],
                borderWidth: 1
            }
        ]
    }), [t, awaitingDiagnosis, awaitingRepair, awaitingShipping, readyForPickup, complaint]);

    return (
        <Card className={className}>
            <Doughnut data={data} options={{maintainAspectRatio:false}}/>
        </Card>
    );
}