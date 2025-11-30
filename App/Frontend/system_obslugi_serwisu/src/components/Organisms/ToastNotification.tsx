import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { LuX, LuCircleCheck, LuCircleAlert } from 'react-icons/lu';

export type ToastType = 'success' | 'error' | 'info';

type ToastProps = Omit<RadixToast.ToastProps, "type"> & {
    title: string;
    description?: string;
    type?: ToastType;
    onClose: () => void;
}

export function ToastNotification({ title, description, type = 'info', onClose, ...props }: ToastProps) {

    const styles = {
        success: "border-l-4 border-l-green-500",
        error: "border-l-4 border-l-red-500",
        info: "border-l-4 border-l-blue-500"
    };

    const icons = {
        success: <LuCircleCheck className="text-green-500" size="1.25rem" />,
        error: <LuCircleAlert className="text-red-500" size="1.25rem" />,
        info: <div className="w-5" />
    };

    return (
        <RadixToast.Root
            {...props}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            className={`
                ${styles[type]}
                bg-white border border-gray-200 rounded shadow-lg p-4 w-[350px]
                flex items-start gap-3
                data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full data-[state=open]:fade-in data-[state=open]:duration-300
                data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:duration-200
                data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
                data-[swipe=cancel]:translate-x-0
                data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-right-full
            `}
        >
            <div className="mt-0.5">
                {icons[type]}
            </div>

            <div className="flex-1 grid gap-1">
                <RadixToast.Title className="font-medium text-gray-900 text-sm">
                    {title}
                </RadixToast.Title>
                {description && (
                    <RadixToast.Description className="text-gray-500 text-sm">
                        {description}
                    </RadixToast.Description>
                )}
            </div>

            <RadixToast.Close className="text-gray-400 hover:text-gray-900 transition-colors">
                <LuX size="1rem" />
            </RadixToast.Close>
        </RadixToast.Root>
    );
}

export function ToastViewport() {
    return (
        <RadixToast.Viewport className="fixed bottom-0 right-0 flex flex-col gap-3 p-6 w-full max-w-[400px] z-[100] outline-none"/>
    );
}