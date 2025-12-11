import {Card} from "@/components/Atoms/Card";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";
import {RSListHeader, RsListHeaderCell} from "@/components/Molecules/RSList/RSListHeader";
import {GetPartReservationsQuery, GetPartReservationsQueryVariables} from "@/__generated__/types";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {RSList} from "@/components/Molecules/RSList/RSList";
import {RsListCell, RSListRow} from "@/components/Molecules/RSList/RSListRow";
import {PageSelector} from "@/components/Molecules/PageSelector";
import {useState} from "react";
import {GET_PART_RESERVATIONS} from "@/graphql/GetPartReservations";
import {useQuery} from "@apollo/client/react";

type PartDetailsReservationsProps = {
    partId: string;
}
export function PartDetailsReservations({partId}: PartDetailsReservationsProps) {
    const t = useTranslations("PartDetails")
    const [selectedPage, setSelectedPage] = useState<number>(1);

    const {
        data,
        loading
    } = useQuery<GetPartReservationsQuery, GetPartReservationsQueryVariables>(GET_PART_RESERVATIONS, {
        variables: {
            partId,
            pageNumber: selectedPage,
            pageSize: 5
        }
    });

    return (
        <div className="flex flex-col w-full">
            <Card className="w-full flex flex-col gap-5">
                <Card.Label className="m-0!">{t("reservations")}</Card.Label>
                <ReservationList
                    reservations={data?.partReservations.items??[]}
                    isLoading={loading}
                    currentPage={selectedPage}
                    onPageChange={setSelectedPage}
                    totalPages={data?.partReservations.totalPages??1}
                />
            </Card>
        </div>
    )
}

export type ReservationListProps = {
    reservations: GetPartReservationsQuery["partReservations"]["items"];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading: boolean;
}

function ReservationList({reservations, currentPage, totalPages, onPageChange, isLoading=false}: ReservationListProps) {
    const t = useTranslations("PartDetails");
    const router = useRouter();

    const headerCells:RsListHeaderCell[] = [
        {title:t("ticketNumber")},
        {title:t("device")},
        {title:t("requested")},
        {title:t("reserved")},
        {title:t("status")}
    ]

    return(
        <>
        {isLoading? <LoadingIcon/>:
            <RSList columns={[{width:"1.5fr"},{width:"1.5fr"},{width:"1fr"},{width:"1fr"},{width:"1fr"}]}>
                <RSListHeader cells={headerCells}/>
                {reservations.map((reservation, reservationId) => {
                    const cells: RsListCell[] = [
                        {kind: "textBold", content: reservation.repair?.ticketNumber??""},
                        {kind: "text", content: (reservation.repair?.deviceInfo.manufacturer??"") + " " + (reservation.repair?.deviceInfo.model??"")},
                        {kind: "text", content: reservation.quantityRequested.toString()},
                        {kind: "text", content: reservation.quantityReserved.toString()},
                        {kind: "reservationStatus", content: reservation.status}
                    ];

                    return <RSListRow key={reservation.id} cells={cells} separator={reservationId < reservations.length - 1}/>;
                })}
            </RSList>
        }
        <div className="flex w-full justify-end">
            <PageSelector currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
        </div>
        </>
    )
}