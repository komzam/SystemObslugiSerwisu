import { useTranslations} from "next-intl";
import { LabeledTextInput } from "@/app/Molecules/LabeledTextInput";
import {LabeledPasswordInput} from "@/app/Molecules/LabeledPasswordInput";

export type AccountType = "normal" | "business";

export type RegisterFormData = {
    email: string;
    password: string;
    repeatPassword: string;
    isBusiness: boolean;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    taxIdNumber?: string;
}

export type RegisterFormProps = {
    accountType: AccountType;
    formData: RegisterFormData;
    onFormChange: (fieldName: string, value: string) => void;
}

export function RegisterForm({accountType, onFormChange}: RegisterFormProps) {
    const t = useTranslations("Register");

    return(
        <div className="bg-inherit flex flex-col gap-5 w-full">
            {
                accountType == "normal" ?
                <div className="bg-inherit flex flex-col md:flex-row gap-5 w-full">
                    <LabeledTextInput wrapperClassName="w-full md:flex-1" className="w-full" id="firstName" label={t("firstName")}
                                      onChange={(e) => onFormChange("firstName", e.target.value)}/>
                    <LabeledTextInput wrapperClassName="w-full md:flex-1" className="w-full" id="lastName" label={t("lastName")}
                                      onChange={(e) => onFormChange("lastName", e.target.value)}/>
                </div>
                :
                <>
                    <LabeledTextInput wrapperClassName="w-full" className="w-full" id="companyName" label={t("companyName")}
                                      onChange={(e) => onFormChange("companyName", e.target.value)}/>
                    <LabeledTextInput wrapperClassName={`w-full`} className="w-full" id="tin" label={t("tin")}
                                      onChange={(e) => onFormChange("taxIdNumber", e.target.value)}/>
                </>

            }
            <LabeledTextInput wrapperClassName="w-full" className="w-full" id="email" type="email" label={t("email")}
                              onChange={(e) => onFormChange("email", e.target.value)}/>
            <div className="bg-inherit flex flex-col md:flex-row gap-5 w-full">
                <LabeledPasswordInput wrapperClassName="w-full md:flex-1" className="w-full" id="password" label={t("password")}
                                  onChange={(e) => onFormChange("password", e.target.value)}/>
                <LabeledPasswordInput wrapperClassName="w-full md:flex-1" className="w-full" id="repeatPassword" label={t("repeatPassword")}
                                  onChange={(e) => onFormChange("repeatPassword", e.target.value)}/>
            </div>
        </div>
    )
}