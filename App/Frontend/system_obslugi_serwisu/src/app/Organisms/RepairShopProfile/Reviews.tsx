"use client"
import {Fragment} from "react";
import { useSearchParams } from 'next/navigation'
import {useTranslations} from "next-intl";
import * as RepairShopElementInfo from "@/app/Molecules/RepairShopElementInfo";
import {Stars} from "@/app/Molecules/Stars";
import {useQuery} from "@apollo/client/react";
import {GET_REVIEWS, GetReviewsQuery, GetReview} from "@/graphql/GetReviews";


type ReviewProps = GetReview & {
    className?: string;
};
function Review({authorName, rating, comment, className=""}: ReviewProps) {
    return(
        <div className={`flex flex-col gap-2 ${className}`}>
            <RepairShopElementInfo.RatingRoot>
                <p className="font-bold">{authorName}</p>
                <Stars numberOfStars={rating}/>
            </RepairShopElementInfo.RatingRoot>
            <p className="line-clamp-3 wrap-break-word">{comment}</p>
        </div>
    )
}

export type ReviewsProps = {repairShopId: string}
export function Reviews({repairShopId}: ReviewsProps) {
    const t = useTranslations("RepairShop");
    const { loading, error, data } = useQuery<GetReviewsQuery>(GET_REVIEWS, {variables: {repairShopId:repairShopId,
                                                                                        pageNumber:1,
                                                                                        pageSize:10}});

    if(loading) return <p>Loading...</p>;
    if (!data) return <p>No data</p>;

    const reviews = data.reviews.items;
    if (reviews.length === 0) return <p>{t("noReviews")}</p>;

    return (
        <div className="flex flex-col divide-y divide-accent3">
            {reviews.map((review, reviewIndex) => (
                <Review key={reviewIndex} {...review} className="py-4 px-2"/>
            ))}
        </div>
    );
}