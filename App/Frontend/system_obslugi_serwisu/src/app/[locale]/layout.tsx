import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import "../globals.css";
import {Navbar} from "@/app/Organisms/Navbar";
import {ApolloClientProvider} from "@/app/Utils/ApolloClientProvider";
import {AuthContextProvider} from "@/app/Utils/AuthContext";

const roboto = Roboto({
  variable: "--font-roboto",
});



export const metadata: Metadata = {
  title: "System Obsługi Serwisu",
  description: "System ułatwiający naprawy sprzętu.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
          <ApolloClientProvider>
              <AuthContextProvider>
                <NextIntlClientProvider>
                    <Navbar>
                        {children}
                    </Navbar>
                </NextIntlClientProvider>
              </AuthContextProvider>
          </ApolloClientProvider>
      </body>
    </html>
  );
}
