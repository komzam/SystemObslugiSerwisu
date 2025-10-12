import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:5167/graphql", credentials: "include" }),
    cache: new InMemoryCache(),
});

export default client;