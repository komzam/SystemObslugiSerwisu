import {Roboto} from "next/font/google";
import type {Metadata} from "next";
import "../../globals.css";
import {ReactNode} from "react";
import {ApolloClientProvider} from "@/app/Utils/ApolloClientProvider";
import {AuthContextProvider} from "@/app/Utils/AuthContext";
import {NextIntlClientProvider} from "next-intl";

const roboto = Roboto({
    variable: "--font-roboto",
    weight: ["100", "300", "400", "500", "700", "900"]
});

export const metadata: Metadata = {
    title: "System Obsługi Serwisu",
    description: "System ułatwiający naprawy sprzętu.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${roboto.variable}`}>
        <ApolloClientProvider actingRole={"worker"}>
            <AuthContextProvider>
                <NextIntlClientProvider>
                    {children}
                </NextIntlClientProvider>
            </AuthContextProvider>
        </ApolloClientProvider>
        </body>
        </html>
    );
}