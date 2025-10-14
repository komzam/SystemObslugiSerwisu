import {ReactNode} from "react";
import {Star} from "@/app/Atoms/Star";
import {useTranslations} from "next-intl";
import { LuMapPin, LuClock, LuUser } from "react-icons/lu";
import {OpenStatus} from "@/app/Molecules/OpenStatus";
import {Button} from "@/app/Atoms/Button";
import Link from "next/link";

export type RootProps = {
    children?: ReactNode;
    className?: string;
}

export function Root({children, className=""}: RootProps) {
    return (
        <div className={`flex flex-col gap-3${className}`}>
            {children}
        </div>
    )
}



export type TitleProps = {
    children?: string;
    className?: string;
}

export function Title({children, className=""}: TitleProps) {
    return (
        <p className={`text-larger2 font-bold ${className}`}>{children}</p>
    )
}



export type RatingRootProps = {
    children?: ReactNode;
    className?: string;
}

export function RatingRoot({children, className=""}: RatingRootProps) {
    return (
        <div className={`flex flex-row items-center gap-2 ${className}`}>
            {children}
        </div>
    )
}



export type RatingStarsProps = {
    numberOfStars: number;
    className?: string;
}

export function RatingStars({numberOfStars, className=""}: RatingStarsProps) {
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
        <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row">
                {stars}
            </div>
            <span className="text-accent4 font-bold">{numberOfStars}</span>
        </div>
    )
}

export type RatingReviewsProps = {
    className?: string;
    numberOfReviews: number;
}

export function RatingReviews({numberOfReviews, className=""}: RatingReviewsProps){
    const t = useTranslations("RepairShop");

    return (
        <span className={`${className}`}>{t("reviews", {count: numberOfReviews})}</span>
    )
}



export type RatingSeparatorProps = {
    className?: string;
}

export function RatingSeparator({className}: RatingSeparatorProps) {
    return <div className={`w-0.5 bg-accent4 h-4 ${className}`}/>
}


export type AddressProps = {
    className?: string;
    street: string;
    buildingNumber: string;
    aptNumber?: string;
    postalCode: string;
    city: string;
}

export function Address({className, street, buildingNumber, aptNumber, postalCode, city}: AddressProps) {
    return (
        <div className={`flex flex-row items-center gap-2 ${className}`}>
            <LuMapPin className="text-accent4"/>
            <p>{street} {buildingNumber}{aptNumber!=null && "/" + aptNumber}, {postalCode} {city}</p>
        </div>
    )
}


type DayHours = { from: string; to: string } | null;

export type IsOpenProps = {
    className?: string;
}

export function IsOpen({className}: IsOpenProps) {
    const t = useTranslations("RepairShop");

    return (
        <div className={`flex flex-row items-center gap-3 ${className}`}>
            <div className="flex flex-row items-center gap-2">
                <LuClock className="text-accent4"/>
                <OpenStatus isOpen={true}/>
            </div>
            <p>{t("closesAt")} 18:00</p>
        </div>
    )
}

export type SeeProfileButtonProps = {
    className?: string;
    repairShopId: string;
}

export function SeeProfileButton({className="", repairShopId}: SeeProfileButtonProps) {
    const t = useTranslations("RepairShop");

    return (
        <Link href={`/repairShop/${repairShopId}`}>
            <Button icon={<LuUser size="18px"/>}>
                {t("seeProfile")}
            </Button>
        </Link>
    )
}