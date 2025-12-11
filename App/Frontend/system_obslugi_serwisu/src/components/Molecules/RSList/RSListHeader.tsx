import {Checkbox} from "@/components/Atoms/Checkbox";

export type RsListHeaderCell = {
    title: string;
    checkbox?: boolean;
    sortable?: boolean;
}

export type RSListHeaderProps = {
    cells: RsListHeaderCell[];
}

export function RSListHeader({cells}: RSListHeaderProps) {
    return (
        <div className="grid col-span-full grid-cols-subgrid p-3 gap-5 items-center font-bold text-accent4 bg-gray-100">
            {cells.map((cell, cellIndex) => (
                <div key={cellIndex}>
                    {cell.checkbox && <Checkbox disabled/>}
                    {cell.title}
                </div>
            ))}
        </div>
    );
}