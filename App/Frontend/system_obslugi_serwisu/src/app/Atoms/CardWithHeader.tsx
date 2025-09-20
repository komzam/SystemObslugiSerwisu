export type CardWithHeaderProps = {
    headerChildren?: React.ReactNode;
    cardChildren?: React.ReactNode;
    headerClassName?: string;
    cardClassName?: string;
    className?: string;
}

export function CardWithHeader({headerChildren, cardChildren, headerClassName="", cardClassName="", className=""}: CardWithHeaderProps) {
    return(
    <div className={`${className}`}>
        <div className={`bg-primary shadow-md px-4 py-3 rounded-t-xl ${headerClassName}`} >{headerChildren}</div>
        <div className={`bg-accent shadow-md p-4 rounded-b-xl ${cardClassName}`} >{cardChildren}</div>
    </div>
    )
}