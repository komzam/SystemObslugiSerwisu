"use client"

import {createContext, useState, ReactNode, useContext, useEffect} from "react";
import {useApolloClient, useQuery} from "@apollo/client/react";
import {AUTH_CONTEXT_QUERY} from "@/graphql/AuthContext";
import {LOGOUT} from "@/graphql/Logout";
import {AuthContextQuery, AuthContextQueryVariables} from "@/__generated__/types";

type AuthContextProviderProps = {
   children: ReactNode;
};

export type AuthContextType = {
    authInfo: AuthContextQuery["me"] | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    logout: () => void;
    update: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({children}: AuthContextProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authInfo, setAuthInfo] = useState<AuthContextQuery["me"] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, refetch } = useQuery<AuthContextQuery, AuthContextQueryVariables>(
        AUTH_CONTEXT_QUERY,
        {
            fetchPolicy: "network-only",
        }
    );

    const client = useApolloClient();

    useEffect(() => {
        setIsLoading(true);
        if(!loading){
            if (data?.me) {
                setAuthInfo(data.me);
                setIsLoggedIn(true);
            } else {
                setAuthInfo(null);
                setIsLoggedIn(false);
            }
            setIsLoading(false);
        }
    }, [loading, data]);

    const logout = async () => {
        await client.mutate({mutation: LOGOUT, fetchPolicy: "network-only"});
        setAuthInfo(null);
        setIsLoggedIn(false);
    }

    const update = async () => await refetch();

    return (
        <AuthContext.Provider value={{authInfo, isLoggedIn, logout, update, isLoading}}>
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
