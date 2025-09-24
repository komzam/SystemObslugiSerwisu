export type ProgressBarStepProps = {
    name: string;
    isActive?: boolean;
    isNextActive?: boolean;
    type?: "first"| "normal" | "last";
    className?: string;
}

export function ProgressBarStep({name, isActive=false, isNextActive=false, type="normal", className=""}: ProgressBarStepProps) {
    const thisNodeColor: string = isActive ? "bg-primary" : "bg-secondary";
    const nextNodeColor: string = isNextActive ? "bg-primary" : "bg-secondary";

    return (
        <div className={`flex flex-col items-center w-full ${className}`}>
            <div className="flex flex-row items-center w-full">
                <div className={`flex-1 ${type=="first"? "bg-transparent": thisNodeColor} h-1`}/>
                <div className={`${thisNodeColor} rounded-full h-5 w-5`}/>
                <div className={`flex-1 ${type=="last"? "bg-transparent": nextNodeColor} h-1`}/>
            </div>
            <p className={`${type=="first"? "" : "col-start-2"} text-center text-smaller2 sm:text-smaller1 overflow-hidden text-ellipsis min-w-0`}>{name}</p>
        </div>
    )
}