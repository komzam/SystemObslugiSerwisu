"use client"
import {useTranslations} from "next-intl";
import * as RepairShopElementInfo from "@/app/Molecules/RepairShopElementInfo";
import {Stars} from "@/app/Molecules/Stars";
import {useMutation, useQuery} from "@apollo/client/react";
import {GET_REVIEWS} from "@/graphql/GetReviews";
import {LoadingIcon} from "@/app/Molecules/LoadingIcon";
import {useAuthContext} from "@/app/Utils/AuthContext";
import {Button} from "@/app/Atoms/Button";
import DialogWindow from "@/app/Molecules/DialogWindow";
import {TextArea} from "@/app/Atoms/TextArea";
import {StarsSelect} from "@/app/Molecules/StarsSelect";
import {ChangeEvent, MouseEvent, useState} from "react";
import {ADD_REVIEW} from "@/graphql/AddReview";
import {PageSelector} from "@/app/Molecules/PageSelector";
import {
    ReviewsQuery,
    ReviewsQueryVariables,
    AddReviewMutationVariables,
    AddReviewMutation, GetRepairShopQuery
} from "@/__generated__/types";


type ReviewProps = ReviewsQuery["reviews"]["items"][number] & {
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

type AddReviewProps = { repairShopId: GetRepairShopQuery["repairShop"]["id"]};
function AddReview({repairShopId}: AddReviewProps){
    const t = useTranslations("RepairShop");
    const [stars, setStars] = useState<number>(0);
    const [comment, setComment] = useState<string|null>(null);
    const [addReviewMutation] = useMutation<AddReviewMutation, AddReviewMutationVariables>(ADD_REVIEW, {refetchQueries: [
            {
                query: GET_REVIEWS,
                variables: { repairShopId, pageNumber: 1, pageSize: 5 }
            }
        ],});


    const addReview = async (e: MouseEvent<HTMLButtonElement>) => {
        if(stars==0) {
            e.preventDefault();
            return;
        }

        await addReviewMutation({
            variables:{
                repairShopId: repairShopId,
                rating: stars,
                comment: comment
            }
        });
        setStars(0);
        setComment(null);
    }

    return (
        <DialogWindow.Root>
            <DialogWindow.Trigger asChild>
                <Button className="w-fit" variant="secondary">{t("addReview")}</Button>
            </DialogWindow.Trigger>
            <DialogWindow.Window aria-describedby={undefined} className="w-[clamp(20rem,calc(100vw-var(--page-margin)*2),40rem)]">
                <div className="flex flex-col gap-3">
                    <DialogWindow.Title>{t("addReviewTitle")}</DialogWindow.Title>
                    <StarsSelect onChangeAction={setStars} starSize="25px"/>
                    <TextArea onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                              className="w-full" placeholder={t("addReviewPlaceholder")} />
                    <div className="flex flex-col items-end">
                        <DialogWindow.Close asChild>
                            <Button onClick={addReview}>{t("addReview")}</Button>
                        </DialogWindow.Close>
                    </div>
                </div>
            </DialogWindow.Window>
        </DialogWindow.Root>
    )
}





export type ReviewsProps = {repairShopId: GetRepairShopQuery["repairShop"]["id"]}
export function Reviews({repairShopId}: ReviewsProps) {
    const t = useTranslations("RepairShop");
    const tComm = useTranslations("Common");
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data} = useQuery<ReviewsQuery, ReviewsQueryVariables>(GET_REVIEWS, {
        variables: {
            repairShopId:repairShopId,
            pageNumber:currentPage,
            pageSize:5
        }
    });
    const authContext = useAuthContext();


    if(loading) return <LoadingIcon/>;
    if (!data) return <p>{tComm("noData")}</p>;

    const reviews = data.reviews.items;

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-2 items-center justify-between">
                <p className="text-larger2 font-bold">{t("usersReviews")}</p>
                {authContext.isLoggedIn && <AddReview repairShopId={repairShopId}/>}
            </div>
            {
                (reviews.length === 0) ? <p>{t("noReviews")}</p>
                    :
                <div className="flex flex-col divide-y divide-accent3">
                    {reviews.map((review, reviewIndex) => (
                        <Review key={reviewIndex} {...review}
                                className={`${reviewIndex!=0 && "pt-4"} ${reviewIndex!=reviews.length-1 && "pb-4"}`}
                        />
                    ))}
                </div>
            }
            <PageSelector totalPages={data.reviews.totalPages} currentPage={currentPage} onPageChange={function (page: number): void {
                setCurrentPage(page);
            }}/>
        </div>
    );
}