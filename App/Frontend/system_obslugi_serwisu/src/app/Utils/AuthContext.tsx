"use client"

import {createContext, useState, ReactNode, useContext, useEffect} from "react";
import { useApolloClient } from "@apollo/client/react";
import {AUTH_CONTEXT_QUERY, AuthContextQuery} from "@/graphql/AuthContext";
import {LOGOUT} from "@/graphql/Logout";

type AuthContextProviderProps = {
   children: ReactNode;
};

export type AuthInfo = {
    email: string;
    name: string;
    isBusiness: boolean;
}

export type AuthContextType = {
    authInfo: AuthInfo | null;
    isLoggedIn: boolean;
    logout: () => void;
    update: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({children}: AuthContextProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null);

    const client = useApolloClient();

    const queryInfo = async () => {
        try {
            const { data } = await client.query<AuthContextQuery>({query: AUTH_CONTEXT_QUERY, fetchPolicy: "network-only"});
            if (data?.me) {
                setAuthInfo(data.me);
                setIsLoggedIn(true);
            } else {
                setAuthInfo(null);
                setIsLoggedIn(false);
            }
        } catch {
            setAuthInfo(null);
            setIsLoggedIn(false);
        }
    }

    const logout = async () => {
        await client.mutate({mutation: LOGOUT, fetchPolicy: "network-only"});
        setAuthInfo(null);
        setIsLoggedIn(false);
    }

    const update = async () => await queryInfo();

    useEffect(() => {
        queryInfo();
    }, []);

    return (
        <AuthContext.Provider value={{authInfo, isLoggedIn, logout, update}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Function used outside auth context provider")
    }
    return context;
}
