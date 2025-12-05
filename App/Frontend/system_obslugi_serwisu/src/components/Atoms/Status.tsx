export type StatusVariant = "yellow" | "blue" | "red" | "green" | "gray" | "orange";

type Variant = {
    dot: string;
    background: string;
    text: string;
}

const variants: Record<StatusVariant, Variant> = {
    yellow: {
        dot: "bg-yellow-300",
        background: "bg-yellow-100",
        text: "text-yellow-700"
    },
    blue: {
        dot: "bg-blue-300",
        background: "bg-blue-100",
        text: "text-blue-700"
    },
    red: {
        dot: "bg-red-300",
        background: "bg-red-100",
        text: "text-red-700"
    },
    green: {
        dot: "bg-lime-300",
        background: "bg-lime-100",
        text: "text-lime-700"
    },
    gray: {
        dot: "bg-gray-300",
        background: "bg-gray-100",
        text: "text-gray-700"
    },
    orange: {
        dot: "bg-orange-300",
        background: "bg-orange-100",
        text: "text-orange-700"
    },
}

export type StatusProps = {
    type: StatusVariant;
    text: string;
    size?: "normal" | "small";
    className?: string;
}

export function Status({type, text, size="normal", className=""}: StatusProps) {
    const selectedVariant: Variant = variants[type];

    return(
        <div className={`flex flex-row gap-2 ${size=="normal" ? "h-10" : "h-7.5"} w-fit items-center px-2.5 rounded-full ${selectedVariant.background} ${className}`}>
            {size=="normal" && <div className={`w-2 h-2 rounded-full flex-shrink-0 ${selectedVariant.dot}`}/>}
            <span className={`font-bold ${selectedVariant.text} ${size=="small" && "text-smaller2"}`}>{text}</span>
        </div>
    )
}