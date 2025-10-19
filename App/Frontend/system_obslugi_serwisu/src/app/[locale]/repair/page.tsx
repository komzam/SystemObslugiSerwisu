import {RepairDetailsTitle} from "@/app/Organisms/RepairDetailsTitle";
import {StatusType} from "@/app/Atoms/Status";
import {RepairDetailsDevInfo} from "@/app/Organisms/RepairDetailsDevInfo";
import {RepairDetailsFaultInfo} from "@/app/Organisms/RepairDetailsFaultInfo";
import {RepairDetailsImages} from "@/app/Organisms/RepairDetailsImages";
import {RepairDetailsHistory} from "@/app/Organisms/RepairDetailsHistory";

export default function Repair() {
    return (
        <div className="flex bg-inherit justify-center">
            <div className="flex flex-col gap-5 w-[clamp(20rem,calc(100vw-var(--page-margin)*2),80rem)]">
                <RepairDetailsTitle title="Playstation 5" repairTicketNumber={123456789} status={StatusType.AwaitingConfirmation } />
                <RepairDetailsDevInfo deviceType="Console" manufacturer="Sony" modelName="CFI-1116A" serialNumber="123123123123"/>
                <RepairDetailsFaultInfo whenFaultOccured="Two weeks ago" howToReplicateFault="Turn on the console" faultDescription="The fan is super loud"/>
                <RepairDetailsImages/>
                <RepairDetailsHistory/>
            </div>
        </div>
    )
}