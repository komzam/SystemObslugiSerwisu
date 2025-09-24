import {Card, CardProps} from "@/app/Atoms/Card";
import * as React from "react";

type LabeledCardProps = CardProps & {
    label: string;
    children?: React.ReactNode;
}

export function LabeledCard({label, children, ...props}: LabeledCardProps) {
    return (
        <Card {...props}>
            <p className="w-full font-bold text-larger2 mb-3">{label}</p>
            {children}
        </Card>
    )
}