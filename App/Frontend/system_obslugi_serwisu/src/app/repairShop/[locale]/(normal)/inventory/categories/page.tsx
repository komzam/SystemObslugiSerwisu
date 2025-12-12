"use client"

import {useTranslations} from "next-intl";
import {useToast} from "@/components/Utils/ToastNotifications";
import {useMutation, useQuery} from "@apollo/client/react";
import {
    AddPartCategoryMutation, AddPartCategoryMutationVariables,
    DeletePartCategoryMutation, DeletePartCategoryMutationVariables,
    EditPartCategoryMutation, EditPartCategoryMutationVariables,
    GetPartCategoriesQuery,
    GetPartCategoriesQueryVariables
} from "@/__generated__/types";
import {ErrorName} from "@/components/Utils/ErrorName";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {GET_PART_CATEGORIES} from "@/graphql/GetPartCategories";
import {RSCategoryList} from "@/components/Organisms/Inventory/CategoryList/RSCategoryList";
import {Card} from "@/components/Atoms/Card";
import * as React from "react";
import {EDIT_PART_CATEGORY} from "@/graphql/EditPartCategory";
import {DELETE_PART_CATEGORY} from "@/graphql/DeletePartCategory";
import {ADD_PART_CATEGORY} from "@/graphql/AddPartCategory";
import {BackButton} from "@/components/Atoms/BackButton";
import {Link} from "@/i18n/navigation";

export default function Categories() {
    const t = useTranslations("CategoryList");
    const tErr = useTranslations("Errors");
    const toasts = useToast();

    const {data, error, loading, refetch} = useQuery<GetPartCategoriesQuery, GetPartCategoriesQueryVariables>(GET_PART_CATEGORIES);
    const [editCategory] = useMutation<EditPartCategoryMutation, EditPartCategoryMutationVariables>(EDIT_PART_CATEGORY);
    const [deleteCategory] = useMutation<DeletePartCategoryMutation, DeletePartCategoryMutationVariables>(DELETE_PART_CATEGORY);
    const [addCategory] = useMutation<AddPartCategoryMutation, AddPartCategoryMutationVariables>(ADD_PART_CATEGORY);

    const onEdit = async (category: GetPartCategoriesQuery["partCategories"][0]) => {
        try{
            await editCategory({
               variables:{
                   partCategoryId: category.id,
                   name: category.name
               }
            });
            await refetch();
        }catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    const onDelete = async (id: string) => {
        try{
            await deleteCategory({
                variables:{
                    partCategoryId: id
                }
            });
            await refetch();
        }catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    const onAdd = async (name: string) => {
        try{
            await addCategory({variables:{name}});
            await refetch();
        }catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    if (error) return <p>ERROR</p>;
    if (loading) return <LoadingIcon/>;
    if (!data) return <p>ERROR</p>;

    return (
        <div className="flex flex-col gap-3 min-w-240 max-w-600">
            <Link href={"/inventory"}><BackButton>{t("backButton")}</BackButton></Link>
            <Card>
                <RSCategoryList categories={data.partCategories}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                onAdd={onAdd}
                                isLoading={loading}/>
            </Card>
        </div>
    );
}