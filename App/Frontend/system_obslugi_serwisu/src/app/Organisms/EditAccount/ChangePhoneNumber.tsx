import {useTranslations} from "next-intl";
import {useState} from "react";
import {useMutation} from "@apollo/client/react";
import {
    ChangePhoneNumberMutation,
    ChangePhoneNumberMutationVariables
} from "@/__generated__/types";
import {ErrorName} from "@/app/Utils/ErrorName";
import {HighlightColors, HighlightedText} from "@/app/Atoms/HighlightedText";
import {Button} from "@/app/Atoms/Button";
import {CHANGE_PHONE_NUMBER} from "@/graphql/ChangePhoneNumber";
import {ChangePhoneNumberChangeHandler, ChangePhoneNumberForm} from "@/app/Molecules/EditAccount/ChangePhoneNumberForm";
import {useAuthContext} from "@/app/Utils/AuthContext";

const defaultForm : ChangePhoneNumberMutationVariables = {
    newPhoneNumber: "",
    regionCode: "PL"
}

export function ChangePhoneNumber(){
    const t = useTranslations("EditAccount");
    const tErr = useTranslations("Errors");
    const authContext = useAuthContext();
    const [error, setError] = useState<string|null>(null);
    const [form, setForm] = useState<ChangePhoneNumberMutationVariables>(defaultForm);
    const [changePhoneNumber] = useMutation<ChangePhoneNumberMutation, ChangePhoneNumberMutationVariables>(CHANGE_PHONE_NUMBER);

    const onFormChange:ChangePhoneNumberChangeHandler = (fieldName, value) => {
        setForm(prev => ({...prev, [fieldName]: value}));
    }

    const onSubmit = async () =>{
        try{
            setError(null);
            console.log(form);
            await changePhoneNumber({variables:{...form}});
            authContext.update();
            setForm(defaultForm);
        }catch(err){
            setError(ErrorName(err, tErr));
        }
    }

    return (
        <>
            {error != null && <HighlightedText color={HighlightColors.Red}>{error}</HighlightedText>}
            <ChangePhoneNumberForm formData={form} onFormChange={onFormChange}/>
            <Button onClick={onSubmit}>{t("change")}</Button>
        </>
    )
}