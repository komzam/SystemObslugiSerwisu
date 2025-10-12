"use client"

import {ReactNode} from "react";
import { ApolloProvider } from "@apollo/client/react";
import client from "@/graphql/ApolloClient";

export function ApolloClientProvider({ children }: { children: ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}