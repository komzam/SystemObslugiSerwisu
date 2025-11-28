export type TextWithDotProps = {
    className?: string;
    children?: string;
}

export function TextWithDot({ children="", className="" }: TextWithDotProps) {
    return (
        <div className={`flex flex-row items-center gap-1 ${className}`}>
            <div className="rounded-full w-[0.5em] h-[0.5em]" style={{ backgroundColor: "currentColor" }}/>
            <p>{children}</p>
        </div>
    )
}