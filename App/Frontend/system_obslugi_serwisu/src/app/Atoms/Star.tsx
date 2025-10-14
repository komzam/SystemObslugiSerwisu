import { LuStar, LuStarHalf } from "react-icons/lu";

export type StarProps = {
    type?: "empty" | "half" | "full";
}

export function Star({type="empty"}: StarProps) {
    return(
        <>
            {type=="empty" && <LuStar className="text-yellow-400"/>}
            {type=="half" &&
                <div className="flex flex-row">
                    <LuStarHalf className="text-yellow-400 -mr-2" fill="currentColor"/>
                    <LuStarHalf className="text-yellow-400 rotate-y-180 -ml-2"/>
                </div>
            }
            {type=="full" && <LuStar className="text-yellow-400" fill="currentColor"/>}
        </>
    )
}