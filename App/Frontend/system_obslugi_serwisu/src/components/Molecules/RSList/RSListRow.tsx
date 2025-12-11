import {RepairStatus, ReservationStatus, StockLevel} from "@/__generated__/types";
import {Link} from "@/i18n/navigation";
import {ReactNode} from "react";
import {HighlightColors, HighlightedText} from "@/components/Atoms/HighlightedText";
import {RepairStatusC} from "@/components/Molecules/RepairStatus";
import {PartStatus} from "@/components/Molecules/PartStatus";
import {Dropdown2, Dropdown2Items} from "@/components/Molecules/Dropdown2";
import {LuEllipsisVertical} from "react-icons/lu";
import {ReservationStatusC} from "@/components/Molecules/ReservationStatusC";
import {Checkbox, CheckboxProps} from "@/components/Atoms/Checkbox";

export type RsListRowProps = {
    cells: RsListCell[];
    separator?: boolean;
}

export function RSListRow({ cells, separator = true}: RsListRowProps) {

    return (
        <div
            className={`
                grid col-span-full grid-cols-subgrid 
                p-3 gap-5 items-center
                hover:bg-gray-200
                ${separator ? 'border-b border-gray-100' : ''}
            `}
        >
            {cells.map((cell, cellIndex) => (
                <div key={cellIndex} className={`line-clamp-1 min-w-0 ${getAlignClass(cell.align)}`}>
                    {renderCell(cell)}
                </div>
            ))}
        </div>
    );
}

export type RsListCell =
    {
        align?: "left" | "center" | "right";
        width?: "auto" | "1fr";
    }&
    (
        |{ kind: "checkbox"; content: CheckboxProps}
        |{ kind: "text"; content: string }
        |{ kind: "textBold"; content: string }
        |{ kind: "highlightedText"; content: string; color: HighlightColors }
        |{ kind: "link"; content: string; href: string }
        |{ kind: "linkIcon"; content: ReactNode; href: string }
        |{ kind: "repairStatus"; content: RepairStatus }
        |{ kind: "stockLevel"; level: StockLevel; stock: number;}
        |{ kind: "reservationStatus"; content: ReservationStatus }
        |{ kind: "options"; options: Dropdown2Items}
    );


function renderCell(cell: RsListCell) {
    switch (cell.kind) {
        case "checkbox":
            return <Checkbox {...cell.content}/>

        case "text":
            return <p>{cell.content}</p>;

        case "textBold":
            return <p className="font-bold">{cell.content}</p>;

        case "highlightedText":
            return <HighlightedText color={cell.color}>{cell.content}</HighlightedText>;

        case "link":
            return <Link className="text-blue-500" href={cell.href}>{cell.content}</Link>;

        case "linkIcon":
            return <Link href={cell.href}>{cell.content}</Link>;

        case "repairStatus":
            return <RepairStatusC type={cell.content} size="small"/>;

        case "stockLevel":
            return <PartStatus level={cell.level} stock={cell.stock} size="small"/>;

        case "options":
            return <Dropdown2 items={cell.options} triggerIcon={<LuEllipsisVertical/>}/>

        case "reservationStatus":
            return <ReservationStatusC type={cell.content}/>

        default:
            return null;
    }
}

function getAlignClass(align: RsListCell["align"]){
    switch (align) {
        case "left":
            return "text-left";

        case "center":
            return "text-center";

        case "right":
            return "text-right";

        default:
            return "";
    }
}