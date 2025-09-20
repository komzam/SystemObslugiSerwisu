import { ReactNode } from 'react';

type CardProps = {
    className?: string;
    children?: ReactNode;
};

export function Card({ className, children } : CardProps){
    return (
        <div className={`bg-accent shadow-md p-[30] rounded-xl ${className}`} >{children}</div>
    );
}