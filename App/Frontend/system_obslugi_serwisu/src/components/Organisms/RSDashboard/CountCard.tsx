import {Card} from "@/components/Atoms/Card";

type CountColor = "black" | "blue" | "yellow" | "green" | "red";

export type CountCardProps = {
    title: string,
    count: number,
    countColor: CountColor,
    className?: string
}

const colors: Record<CountColor, string> = {
    black: "text-black",
    blue: "text-blue-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
    red: "text-red-400"
}

export default function CountCard({title, count, countColor, className=""}: CountCardProps) {

    return (
        <Card className={className}>
            <p className={"text-larger2 font-bold text-accent4"}>{title}</p>
            <p className={`text-larger1 font-bold ${colors[countColor]}`}>{count}</p>
        </Card>
    );
}