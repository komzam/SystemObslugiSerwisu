import {ReactNode} from "react";

export type IconAndTitleProps = {icon:ReactNode; title:string; children: ReactNode};
export function IconAndTitle({icon, title, children}: IconAndTitleProps) {
    return (
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
            {icon}
            <p className="font-bold">{title}</p>
            <div className="col-start-2">
                {children}
            </div>
        </div>
    )
}