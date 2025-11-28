import {useTranslations} from "next-intl";
import {ChangePasswordChangeHandler, ChangePasswordForm} from "@/components/Molecules/EditAccount/ChangePasswordForm";
import {Button} from "@/components/Atoms/Button";
import {HighlightColors, HighlightedText} from "@/components/Atoms/HighlightedText";
import {useState} from "react";
import {ChangePasswordMutation, ChangePasswordMutationVariables} from "@/__generated__/types";
import {useMutation} from "@apollo/client/react";
import {CHANGE_PASSWORD} from "@/graphql/ChangePassword";
import {ErrorName} from "@/components/Utils/ErrorName";
import {useAuthContext} from "@/components/Utils/AuthContext";

const defaultForm : ChangePasswordForm = {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: ""
}

export function ChangePassword(){
    const t = useTranslations("EditAccount");
    const tErr = useTranslations("Errors");
    const authContext = useAuthContext();
    const [error, setError] = useState<string|null>(null);
    const [form, setForm] = useState<ChangePasswordForm>(defaultForm);
    const [changePassword] = useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(CHANGE_PASSWORD);

    const onFormChange:ChangePasswordChangeHandler = (fieldName, value) => {
        setForm(prev => ({...prev, [fieldName]: value}));
    }

    const onSubmit = async () =>{
        try{
            if(form.newPassword !== form.repeatNewPassword){
                setError(tErr("Identity.PasswordMismatch"));
                return;
            }
            setError(null);
            await changePassword({variables:{currentPassword: form.currentPassword, newPassword: form.newPassword}});
            authContext.update();
            setForm(defaultForm);
        }catch(err){
            setError(ErrorName(err, tErr));
        }
    }

    return (
        <>
            {error != null && <HighlightedText color={HighlightColors.Red}>{error}</HighlightedText>}
            <ChangePasswordForm formData={form} onFormChange={onFormChange}/>
            <Button onClick={onSubmit}>{t("change")}</Button>
        </>
    )
}