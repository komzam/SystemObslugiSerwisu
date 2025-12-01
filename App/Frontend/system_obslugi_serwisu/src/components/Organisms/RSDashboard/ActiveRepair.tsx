import {Card} from "@/components/Atoms/Card";
import {RepairStatus} from "@/__generated__/types";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/Atoms/Button";
import {useTranslations} from "next-intl";
import {RepairStatusC} from "@/components/Molecules/RepairStatus";

export type ActiveRepairDto = {
    id: string;
    title: string;
    ticketNumber: string;
    description: string;
    status: RepairStatus;
    assignedOn: Date;
}

export type ActiveRepairProps = {
    className?: string;
    activeRepair?: ActiveRepairDto;
}

export default function ActiveRepair({ className="", activeRepair}: ActiveRepairProps) {
    const t = useTranslations("Dashboard.ActiveRepair");

    return (
        <Card className={`${className} flex flex-col justify-between gap-7`}>
            <p className="text-larger1 font-bold">{t("title")}</p>
            {activeRepair != null?
                <div className="flex flex-row">
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="w-full flex flex-col">
                            <p className="text-larger2 font-bold line-clamp-1">{activeRepair.title}</p>
                            <p className="font-bold text-accent4 line-clamp-1">{activeRepair.ticketNumber}</p>
                        </div>
                        <p className="text-accent4 line-clamp-2">{activeRepair.description}</p>
                    </div>
                    <RepairStatusC type={activeRepair.status}/>
                </div>
                :
                <p className="text-center text-larger2 text-accent4 font-bold">{t("noActiveRepair")}</p>
            }
            {activeRepair &&
                <div className="flex flex-row">
                    <div className="flex-1 flex flex-col">
                        <p>{t("assignedOn")}:</p>
                        <p>{activeRepair.assignedOn.toLocaleString()}</p>
                    </div>
                    <Link href={`/repair/${activeRepair.id}`}>
                        <Button>{t("viewDetails")}</Button>
                    </Link>
                </div>
            }
        </Card>
    );
}