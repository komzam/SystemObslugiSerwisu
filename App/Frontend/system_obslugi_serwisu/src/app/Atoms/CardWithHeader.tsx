import {ComponentPropsWithRef, ReactNode} from "react";

type CardWithHeaderProps = ComponentPropsWithRef<"div"> & {
    className?: string;
    children?: ReactNode;
}

export function CardWithHeader({className="", children, ...props}: CardWithHeaderProps) {
    return(
    <div className={`shadow-md rounded-b-xl ${className}`} {...props}>
        {children}
    </div>
    )
}

CardWithHeader.Header = function Header({className="", children, ...props}: CardWithHeaderProps){
    return <div className={`bg-primary  px-4 py-3 rounded-t-xl ${className}`} {...props}>{children}</div>
}

CardWithHeader.Card = function Card({className="", children, ...props}: CardWithHeaderProps){
    return <div className={`bg-accent p-4 rounded-b-xl ${className}`} {...props}>{children}</div>
}