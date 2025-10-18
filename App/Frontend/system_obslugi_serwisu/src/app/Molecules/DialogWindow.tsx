import * as Dialog from "@radix-ui/react-dialog";
import {ReactNode, RefAttributes} from "react";
import {Card} from "@/app/Atoms/Card";
import {LuX} from "react-icons/lu";
import {Button} from "@/app/Atoms/Button";

export default function DialogWindow() {
    return (<></>)
}

DialogWindow.Root = Dialog.Root;
DialogWindow.Trigger = Dialog.Trigger;
DialogWindow.Close = Dialog.Close;
DialogWindow.Description = Dialog.Description;

export type TitleProps = Dialog.DialogTitleProps & RefAttributes<HTMLHeadingElement>;
DialogWindow.Title = function Title({className, ...props}: TitleProps) {
    return (
        <Dialog.Title className={`font-bold text-larger2 mb-2 ${className}`} {...props}/>
    )
}

export type WindowProps = Dialog.DialogContentProps & {
    className?: string;
    children?: ReactNode;
}
DialogWindow.Window = function Window({children, className="", ...props}: WindowProps) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content {...props} className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 ${className}`}>
                <Dialog.Close asChild>
                    <button className="absolute right-2.5 top-2.5 rounded-full p-1 bg-accent2">
                        <LuX className="text-primary" size="20px"/>
                    </button>
                </Dialog.Close>
                {children}
            </Dialog.Content>
        </Dialog.Portal>
    )
}
