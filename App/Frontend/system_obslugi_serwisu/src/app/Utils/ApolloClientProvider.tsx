"use client"

import {ReactNode} from "react";
import { ApolloProvider } from "@apollo/client/react";
import {customerClient, workerClient} from "@/graphql/ApolloClient";

export function ApolloClientProvider({ children, actingRole }: { children: ReactNode, actingRole: 'customer'| 'worker'}) {
    if(actingRole === 'customer') {
        return <ApolloProvider client={customerClient}>{children}</ApolloProvider>
    }else {
        return <ApolloProvider client={workerClient}>{children}</ApolloProvider>
    }
}