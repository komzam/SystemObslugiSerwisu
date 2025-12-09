import { Card } from "@/components/Atoms/Card";
import {NoteItem} from "@/components/Molecules/NoteItem";
import {useTranslations} from "next-intl";
import {useMutation, useQuery} from "@apollo/client/react";
import {
    AddRepairNoteMutation,
    AddRepairNoteMutationVariables, DeleteRepairNoteMutation, DeleteRepairNoteMutationVariables,
    GetRepairNotesQuery,
    GetRepairNotesQueryVariables
} from "@/__generated__/types";
import {GET_REPAIR_NOTES} from "@/graphql/GetRepairNotes";
import {LoadingIcon} from "@/components/Molecules/LoadingIcon";
import {ADD_REPAIR_NOTE} from "@/graphql/AddRepairNote";
import {DELETE_REPAIR_NOTE} from "@/graphql/DeleteRepairNote";
import {useState} from "react";
import {TextArea} from "@/components/Atoms/TextArea";
import { Button } from "@/components/Atoms/Button";
import {useToast} from "@/components/Utils/ToastNotifications";
import {ErrorName} from "@/components/Utils/ErrorName";

export function RepairDetailsNotes({repairId} :{repairId:string}) {
    const t = useTranslations("RepairDetails");
    const tErr = useTranslations("Errors");
    const toasts = useToast();
    const [noteContent, setNoteContent] = useState<string>("");
    const {
        data: noteData,
        loading: notesLoading,
        refetch: refetchNotes
    } = useQuery<GetRepairNotesQuery, GetRepairNotesQueryVariables>(GET_REPAIR_NOTES, {variables: {repairId}});

    const [addNote] = useMutation<AddRepairNoteMutation, AddRepairNoteMutationVariables>(ADD_REPAIR_NOTE);
    const [delNote] = useMutation<DeleteRepairNoteMutation, DeleteRepairNoteMutationVariables>(DELETE_REPAIR_NOTE);

    const onAddNote = async () => {
        if(noteContent === "") return;
        try{
            await addNote({variables:{repairId, content:noteContent}});
            await refetchNotes();
        }catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }

    const onDeleteNote = async (noteId: string) => {
        try{
            await delNote({variables:{repairNoteId:noteId}});
            await refetchNotes();
        }catch (err) {
            toasts.toast({title: tErr("error"), type: "error", description: ErrorName(err, tErr)});
        }
    }


    return(
        <Card>
            <Card.Label>{t("internalNotes")}</Card.Label>
            {notesLoading && <LoadingIcon/>}
            {!notesLoading && noteData &&
                <div className="flex flex-col gap-2 mb-4">
                    {noteData.repairNotes.map((note) => (
                        <NoteItem
                            key={note.id}
                            id={note.id}
                            author={(note.worker?.firstName??"") + " " + (note.worker?.lastName??"")}
                            content={note.content}
                            createdAt={new Date(Date.parse(note.createdAt))}
                            onDelete={onDeleteNote}
                        />
                    ))}
                </div>
            }
            <TextArea className="w-full" placeholder="" value={noteContent} onChange={e => setNoteContent(e.target.value)}/>
            <Button onClick={onAddNote}>{t("addNote")}</Button>
        </Card>
    );
}