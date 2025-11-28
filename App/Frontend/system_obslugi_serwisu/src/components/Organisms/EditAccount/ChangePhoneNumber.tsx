import {useTranslations} from "next-intl";
import {useState} from "react";
import {useMutation} from "@apollo/client/react";
import {
    ChangePhoneNumberMutation,
    ChangePhoneNumberMutationVariables, RemovePhoneNumberMutation, RemovePhoneNumberMutationVariables
} from "@/__generated__/types";
import {ErrorName} from "@/components/Utils/ErrorName";
import {HighlightColors, HighlightedText} from "@/components/Atoms/HighlightedText";
import {Button} from "@/components/Atoms/Button";
import {CHANGE_PHONE_NUMBER} from "@/graphql/ChangePhoneNumber";
import {ChangePhoneNumberChangeHandler, ChangePhoneNumberForm} from "@/components/Molecules/EditAccount/ChangePhoneNumberForm";
import {useAuthContext} from "@/components/Utils/AuthContext";
import {REMOVE_PHONE_NUMBER} from "@/graphql/RemovePhoneNumber";

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
    const [removePhoneNumber] = useMutation<RemovePhoneNumberMutation, RemovePhoneNumberMutationVariables>(REMOVE_PHONE_NUMBER);

    const onFormChange:ChangePhoneNumberChangeHandler = (fieldName, value) => {
        setForm(prev => ({...prev, [fieldName]: value}));
    }

    const onSubmit = async () =>{
        try{
            setError(null);
            await changePhoneNumber({variables:{...form}});
            authContext.update();
            setForm(defaultForm);
        }catch(err){
            setError(ErrorName(err, tErr));
        }
    }

    const onRemove = async () => {
        try{
            setError(null);
            await removePhoneNumber();
            authContext.update();
        }catch(err){
            setError(ErrorName(err, tErr));
        }
    }

    return (
        <>
            {error != null && <HighlightedText color={HighlightColors.Red}>{error}</HighlightedText>}
            <ChangePhoneNumberForm formData={form} onFormChange={onFormChange}/>
            <div className="flex flex-col gap-2">
                <Button onClick={onSubmit}>{t("change")}</Button>
                {authContext.authInfo?.__typename === "FullCustomerDto"
                    && authContext.authInfo?.phone != null
                    && <Button color="danger" variant="secondary" onClick={onRemove}>{t("remove")}</Button>}
            </div>
        </>
    )
}