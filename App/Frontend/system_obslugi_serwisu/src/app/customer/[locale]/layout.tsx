import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import "../../globals.css";
import * as Navbar from "@/components/Organisms/Navbar";
import {ApolloClientProvider} from "@/components/Utils/ApolloClientProvider";
import {AuthContextProvider} from "@/components/Utils/AuthContext";
import {ReactNode} from "react";

const roboto = Roboto({
    variable: "--font-roboto",
    weight: ["100", "300", "400", "500", "700", "900"]
});

export const metadata: Metadata = {
  title: "System Obsługi Serwisu",
  description: "System ułatwiający naprawy sprzętu.",
};

export default function RootLayout({ children, }: Readonly<{ children: ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
          <ApolloClientProvider actingRole={"customer"}>
              <AuthContextProvider>
                <NextIntlClientProvider>
                        <Navbar.Root>
                            <Navbar.Navbar/>
                            <Navbar.Outlet className="pt-16 h-screen">
                                <div className="bg-inherit h-max p-[var(--page-margin)]">
                                    {children}
                                </div>
                            </Navbar.Outlet>
                        </Navbar.Root>
                </NextIntlClientProvider>
              </AuthContextProvider>
          </ApolloClientProvider>
      </body>
    </html>
  );
}
