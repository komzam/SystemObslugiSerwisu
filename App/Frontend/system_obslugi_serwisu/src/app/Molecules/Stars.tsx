import {ReactNode} from "react";
import {Star} from "@/app/Atoms/Star";
import {RatingStarsProps} from "@/app/Molecules/RepairShopElementInfo";

export type StarsProps = {
    numberOfStars: number;
    className?: string;
}

export function Stars({numberOfStars, className=""}: StarsProps){
    numberOfStars = Math.min(Math.max(numberOfStars, 0), 5); // 0-5
    const fullStars:number = Math.floor(numberOfStars);
    const halfStar:boolean = numberOfStars-fullStars >= 0.5;
    const stars: ReactNode[] = [];

    for(let i=0; i<5; i++){
        if(i<fullStars) {
            stars.push(<Star type="full" key={i}/>);
        }else if(i==fullStars && halfStar){
            stars.push(<Star type="half" key={i}/>);
        }else{
            stars.push(<Star type="empty" key={i}/>);
        }
    }

    return (
        <div className={`flex flex-row ${className}`}>
            {stars}
        </div>
    )
}