
import {useTranslations} from "next-intl";
import {Card} from "@/components/Atoms/Card";
import {
    AssignYourselfMutation,
    AssignYourselfMutationVariables,
    GetAssignedTechnicianQuery,
    GetAssignedTechnicianQueryVariables, UnassignMutation, UnassignMutationVariables
} from "@/__generated__/types";
import {GET_ASSIGNED_TECHNICIAN} from "@/graphql/GetAssignedTechnician";
import {useMutation, useQuery} from "@apollo/client/react";
import {Button} from "@/components/Atoms/Button";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {ASSIGN_YOURSELF} from "@/graphql/AssignYourself";
import {UNASSIGN} from "@/graphql/Unassign";
import {ErrorName} from "@/components/Utils/ErrorName";
import {useToast} from "@/components/Utils/ToastNotifications";

type RepairDetailsAssignedTechnicianProps ={
    repairId:string,
};

export function RepairDetailsAssignedTechnician({repairId}:RepairDetailsAssignedTechnicianProps) {
    const t = useTranslations("RepairDetails");
    const tErr = useTranslations("Errors");
    const auth = useAuthContext();
    const toasts = useToast();
    const {
        data: techData,
        refetch: refetchTech
    } = useQuery<GetAssignedTechnicianQuery, GetAssignedTechnicianQueryVariables>(GET_ASSIGNED_TECHNICIAN, {variables: {repairId}});

    const [assignYourself] = useMutation<AssignYourselfMutation, AssignYourselfMutationVariables>(ASSIGN_YOURSELF);
    const [unassign] = useMutation<UnassignMutation, UnassignMutationVariables>(UNASSIGN, {variables: {repairId}});

    const onAssignYourself = async () => {
        try {
            await assignYourself({variables: {repairId}});
            await refetchTech();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    const onUnassign = async () => {
        try {
            await unassign({variables: {repairId}});
            await refetchTech();
        } catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    const assignedTech = techData?.repair.assignedWorker;
    const myId = auth.authInfo?.id??"";

    return (
        <Card className="flex flex-col h-full">
            <div className="flex-1 space-y-2">
                <Card.Label>{t("assignedTechnician")}</Card.Label>

                {/* Technician Name Display */}
                {techData && (
                    <div className="text-sm">
                        {assignedTech ? (
                            <p className="font-medium">
                                {assignedTech.firstName} {assignedTech.lastName}
                            </p>
                        ) : (
                            <p className="text-accent4 italic">
                                {t("unassigned")}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {techData && (
                <div className="mt-auto pt-4">
                    {!assignedTech && (
                        <Button onClick={onAssignYourself} className="w-full">
                            {t("assignYourself")}
                        </Button>
                    )}

                    {assignedTech?.id === myId && (
                        <Button onClick={onUnassign} color="danger" variant="secondary" className="w-full">
                            {t("unassign")}
                        </Button>
                    )}
                </div>
            )}
        </Card>
    )
}