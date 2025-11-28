export enum HighlightColors{
    Gray = "bg-gray-300",
    Green = "bg-lime-100 text-lime-700",
    Red = "bg-red-100 text-red-700",
    Blue = "bg-blue-100 text-blue-700",
}

type HighlightedTextProps = {
    color?: HighlightColors;
    children?: string;
    className?: string;
}

export function HighlightedText({color=HighlightColors.Gray, children="", className=""} : HighlightedTextProps){
    return (
        <span className={`p-1 h-fit rounded-sm ${color} ${className}`}>{children}</span>
    )
}