"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { ToastNotification, ToastViewport, ToastType } from "@/components/Organisms/ToastNotification";

type ToastData = {
    id: string;
    title: string;
    description?: string;
    type?: ToastType;
};

interface ToastContextType {
    toast: (props: Omit<ToastData, "id">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const toast = ({ title, description, type = "info" }: Omit<ToastData, "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, title, description, type }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            <RadixToast.Provider swipeDirection="right">
                {children}

                {toasts.map((t) => (
                    <ToastNotification
                        key={t.id}
                        title={t.title}
                        description={t.description}
                        type={t.type}
                        onClose={() => removeToast(t.id)}
                    />
                ))}

                <ToastViewport />
            </RadixToast.Provider>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}