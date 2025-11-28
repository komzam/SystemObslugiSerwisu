"use client"

import {ReactNode, useState} from "react";
import {Star} from "@/components/Atoms/Star";

export type StarsSelectProps = {
    onChangeAction?: (newValue: number) => void;
    starSize?: string;
}

export function StarsSelect({onChangeAction, starSize}:StarsSelectProps) {
    const [numberOfStars, setNumberOfStars] = useState<number>(0);

    const onClick = (buttonIndex :number) => {
        const newStars = buttonIndex+1;

        if(newStars == numberOfStars)
            return;

        setNumberOfStars(newStars);
        if(onChangeAction)
            onChangeAction(newStars);
    };

    const stars: ReactNode[] = [];
    for(let i=0; i<5; i++){
        if(i<numberOfStars) {
            stars.push(
                <button className="cursor-pointer" onClick={() => onClick(i)} key={i}>
                    <Star size={starSize} type="full"/>
                </button>
            );
        }else{
            stars.push(
                <button className="cursor-pointer" onClick={() => onClick(i)} key={i}>
                    <Star size={starSize} type="empty"/>
                </button>
            );
        }
    }

    return (
        <div className={`flex flex-row`}>
            {stars}
        </div>
    )
}