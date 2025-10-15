import {ReactNode} from "react";
import {useTranslations} from "next-intl";
import { LuClock, LuUser } from "react-icons/lu";
import {OpenStatus} from "@/app/Molecules/OpenStatus";
import {Button} from "@/app/Atoms/Button";
import Link from "next/link";
import {Stars} from "@/app/Molecules/Stars";
import * as RepairShopInfo from "@/app/Molecules/RepairShopInfo";

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

    return (
        <div className="flex flex-row gap-2 items-center">
            <Stars numberOfStars={numberOfStars}/>
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

export const Address = RepairShopInfo.Address;

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
        <Link className="w-fit" href={`/repairShop/${repairShopId}`}>
            <Button icon={<LuUser size="18px"/>}>
                {t("seeProfile")}
            </Button>
        </Link>
    )
}