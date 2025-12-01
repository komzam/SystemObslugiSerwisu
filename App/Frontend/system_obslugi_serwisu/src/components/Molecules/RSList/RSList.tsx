import {ReactNode} from "react";

export type RsColumnConfig = {
    width: "auto" | "1fr" | string;
    align?: "left" | "center" | "right";
};

export type RsListProps = {
    columns: RsColumnConfig[];
    children: ReactNode;
};

export function RSList({ columns, children }: RsListProps) {
    const gridTemplate = columns.map(c => c.width === 'auto' ? 'auto' : `minmax(0,${c.width})`).join(' ');

    return (
        <div
            className="grid w-full"
            style={{ gridTemplateColumns: gridTemplate }}
        >
            {children}
        </div>
    );
}