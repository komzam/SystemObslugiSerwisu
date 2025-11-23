import {useTranslations} from "next-intl";
import {Button} from "@/app/Atoms/Button";
import {HighlightColors, HighlightedText} from "@/app/Atoms/HighlightedText";
import {useState} from "react";
import {
    ChangeEmailMutation,
    ChangeEmailMutationVariables,
} from "@/__generated__/types";
import {useMutation} from "@apollo/client/react";
import {ErrorName} from "@/app/Utils/ErrorName";
import {CHANGE_EMAIL} from "@/graphql/ChangeEmail";
import {ChangeEmailChangeHandler, ChangeEmailForm} from "@/app/Molecules/EditAccount/ChangeEmailForm";
import {useAuthContext} from "@/app/Utils/AuthContext";

const defaultForm : ChangeEmailMutationVariables = {
    password: "",
    newEmail: ""
}

export function ChangeEmail(){
    const t = useTranslations("EditAccount");
    const tErr = useTranslations("Errors");
    const authContext = useAuthContext();
    const [error, setError] = useState<string|null>(null);
    const [form, setForm] = useState<ChangeEmailMutationVariables>(defaultForm);
    const [changeEmail] = useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(CHANGE_EMAIL);

    const onFormChange:ChangeEmailChangeHandler = (fieldName, value) => {
        setForm(prev => ({...prev, [fieldName]: value}));
    }

    const onSubmit = async () =>{
        try{
            setError(null);
            await changeEmail({variables:{...form}});
            authContext.update();
            setForm(defaultForm);
        }catch(err){
            setError(ErrorName(err, tErr));
        }
    }

    return (
        <>
            {error != null && <HighlightedText color={HighlightColors.Red}>{error}</HighlightedText>}
            <ChangeEmailForm formData={form} onFormChange={onFormChange}/>
            <Button onClick={onSubmit}>{t("change")}</Button>
        </>
    )
}