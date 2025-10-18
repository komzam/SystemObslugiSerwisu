import { LuStar, LuStarHalf } from "react-icons/lu";

export type StarProps = {
    type?: "empty" | "half" | "full";
    size?: string;
}

export function Star({type="empty", size=""}: StarProps) {
    return(
        <>
            {type=="empty" && <LuStar size={size} className="text-yellow-400"/>}
            {type=="half" &&
                <div className="flex flex-row">
                    <LuStarHalf size={size} className="text-yellow-400 -mr-2" fill="currentColor"/>
                    <LuStarHalf size={size} className="text-yellow-400 rotate-y-180 -ml-2"/>
                </div>
            }
            {type=="full" && <LuStar size={size} className="text-yellow-400" fill="currentColor"/>}
        </>
    )
}