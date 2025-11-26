import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from "@apollo/client";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {OperationTypeNode} from "graphql/language";

const httpLink = (actingRole: 'customer' | 'worker') => new HttpLink({
    uri: "http://localhost:8080/graphql",
    credentials: "include",
    headers: {
        "X-ActingRole": actingRole
    }
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: "ws://localhost:8080/graphql",
    })
);

const splitLink = (actingRole: 'customer' | 'worker') => ApolloLink.split(
    ({ operationType }) => {
        return operationType === OperationTypeNode.SUBSCRIPTION;
    },
    wsLink,
    httpLink(actingRole)
);

const cache = () => new InMemoryCache({
    typePolicies: {
        DeviceInfoDto: {
            keyFields: false,
            merge(existing = {}, incoming) {
                return {...existing, ...incoming};
            },
        },
        FaultInfoDto: {
            keyFields: false,
            merge(existing = {}, incoming) {
                return {...existing, ...incoming};
            }
        },
        FullCustomerDto:{
            keyFields: ["id"],
            fields: {
                me: {
                    merge(existing = {}, incoming) {
                        return { ...existing, ...incoming };
                    },
                },
                conversations: {
                    keyArgs: false,
                    merge(existing = {}, incoming) {
                        const existingItems = existing?.items || [];
                        const incomingItems = incoming?.items || [];

                        return {
                            ...incoming,
                            items: [...existingItems, ...incomingItems],
                        };
                    },
                }
            }
        }
    },
});

const customerClient = new ApolloClient({
    link: splitLink('customer'),
    cache: cache(),
});

const workerClient = new ApolloClient({
    link: splitLink('worker'),
    cache: cache(),
});

export {customerClient, workerClient}