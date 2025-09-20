export type ProgressBarStepProps = {
    name: string;
    isActive?: boolean;
    isNextActive?: boolean;
    type?: "first"| "normal" | "last";
    className?: string;
}

export function ProgressBarStep({name, isActive=false, isNextActive=false, type="normal", className=""}: ProgressBarStepProps) {
    const thisNodeColor: string = isActive ? "primary" : "secondary";
    const nextNodeColor: string = isNextActive ? "primary" : "secondary";

    return (
        <div className={`grid grid-cols-[${type=="first"?"auto":"1fr_auto"}] items-center ${type=="first"?"w-fit":"w-full"} ${className}`}>
            {type != "first" && <div className={`bg-${thisNodeColor} h-1`}/>}
            <div className="flex flex-row items-center">
                <div className={`flex-1 bg-${type=="first"? "transparent": thisNodeColor} h-1`}/>
                <div className={`bg-${thisNodeColor} rounded-full h-5 w-5`}/>
                <div className={`flex-1 bg-${type=="last"? "transparent": nextNodeColor} h-1`}/>
            </div>
            <p className={`${type=="first"? "" : "col-start-2"} text-center text-smaller1 whitespace-nowrap`}>{name}</p>
        </div>
    )
}