"use client"

import {useTranslations} from "next-intl";
import {
    ActingRole,
    ConversationExistsQuery,
    ConversationExistsQueryVariables,
    ConversationType, CreateConversationMutation, CreateConversationMutationVariables,
    GetRepairShopForNewConvQuery,
    GetRepairShopForNewConvQueryVariables
} from "@/__generated__/types";
import {ConversationCard} from "@/app/Organisms/ConversationCard";
import * as React from "react";
import {useMutation, useQuery} from "@apollo/client/react";
import {GET_REPAIRSHOP_FOR_NEW_CONV} from "@/graphql/GetRepairShopForNewConv";
import {useSearchParams} from "next/navigation";
import {useRouter} from "@/i18n/navigation";
import {Card} from "@/app/Atoms/Card";
import {LoadingIcon} from "@/app/Molecules/LoadingIcon";
import {useEffect} from "react";
import {useAuthContext} from "@/app/Utils/AuthContext";
import {CONVERSATION_EXISTS} from "@/graphql/ConversationExists";
import {CREATE_CONVERSATION} from "@/graphql/CreateConversation";
import {GET_CUSTOMER_CONVERSATIONS} from "@/graphql/GetCustomerConversations";

export default function Messages() {
    const t = useTranslations("Messages");
    const router = useRouter();
    const authContext = useAuthContext();
    const searchParams = useSearchParams();
    const repairShopId = searchParams.get("repairShopId");

    useEffect(() => {
        if (!repairShopId) {
            router.push("/messages");
        }
    }, [repairShopId, router]);

    const {data: repairShopQuery, loading: repairShopLoading} = useQuery<GetRepairShopForNewConvQuery, GetRepairShopForNewConvQueryVariables>
                (GET_REPAIRSHOP_FOR_NEW_CONV, {variables:{repairShopId:repairShopId as string}, skip: !repairShopId});

    const {data: conversationExistsQuery, loading: conversationExistsLoading} =
        useQuery<ConversationExistsQuery, ConversationExistsQueryVariables>
                (CONVERSATION_EXISTS, {
                    variables: {
                        customerId: authContext.authInfo?.id,
                        repairShopId: repairShopId
                    },
                    skip: !repairShopId
                }
        );

    const [createConversation] = useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CREATE_CONVERSATION);

    useEffect(() => {
        if(!conversationExistsLoading && conversationExistsQuery){
            router.push(`/messages/${conversationExistsQuery.conversationByParticipants.id}`)
        }
    }, [conversationExistsQuery, conversationExistsLoading]);


    const onCreateConversation = async (message: string): Promise<boolean> =>{
        try{
            const conversation = await createConversation({variables:{receiverId: repairShopId, firstMessage:message}});
            router.push(`/messages/${conversation?.data?.createConversation.id}`);
            return true;
        }catch{
            return false;
        }
    };

    if(repairShopLoading)
        return(
            <Card className={`bg-accent3 hidden !p-4 w-full md:flex md:basis-[79%] md:flex-col md:items-center md:justify-center`}>
                <LoadingIcon/>
            </Card>
        );

    return (
        <ConversationCard className={`md:flex md:basis-[79%]`}
                          conversationType={ConversationType.GeneralChat}
                          title={repairShopQuery?.repairShop.name ?? ""}
                          rating={repairShopQuery?.repairShop.rating ?? 4}
                          reviewCount={repairShopQuery?.repairShop.reviewCount?? 11}
                          messages={[]}
                          onMessageSendAction={onCreateConversation}
        />
    );
}
