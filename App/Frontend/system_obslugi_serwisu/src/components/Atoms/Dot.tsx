
export type DotProps = {
    text: string;
    variant?: "primary" | "secondary";
}

export function Dot({text, variant="primary"}: DotProps) {

    return (
        <p className={`flex flex-shrink-0 bg-${variant} text-white font-bold w-8 h-8 rounded-full items-center justify-center truncate`}>{text}</p>
    )
}