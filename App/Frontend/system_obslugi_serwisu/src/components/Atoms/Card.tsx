import { ReactNode } from 'react';
import * as React from "react";

export type CardProps = {
    className?: string;
    children?: ReactNode;
};

export type CardLabel = {
    className?: string;
    children?: string;
}

export function Card({ className="", children } : CardProps){
    return (
        <div className={`bg-accent shadow-md p-5 rounded-xl ${className}`} >{children}</div>
    );
}

Card.Label = function CardLabel( {className="", children}: CardLabel ) {
    return <p className={`w-full font-bold text-larger2 mb-3 ${className}`}>{children}</p>
}