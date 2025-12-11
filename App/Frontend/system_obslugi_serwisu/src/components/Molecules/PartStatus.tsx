import {StockLevel} from "@/__generated__/types";
import {useTranslations} from "next-intl";
import {Status, StatusProps, StatusVariant} from "@/components/Atoms/Status";

const LevelToVisual: Record<StockLevel, StatusVariant> = {
    [StockLevel.Low]: "yellow",
    [StockLevel.Normal]:"green",
    [StockLevel.OutOfStock]:"red"
}

type PartStatusProps = Omit<Omit<StatusProps, 'type'>, "text">&{
    level: StockLevel;
    stock: number;
}

export function PartStatus({level, stock, ...props}: PartStatusProps) {
    const t = useTranslations("StockLevel");
    const selectedVariant: StatusVariant = LevelToVisual[level];

    return <Status type={selectedVariant} text={`${t(level)} (${stock})`} {...props}/>
}