export type RsListHeaderCell = {
    title: string;
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
                    {cell.title}
                </div>
            ))}
        </div>
    );
}