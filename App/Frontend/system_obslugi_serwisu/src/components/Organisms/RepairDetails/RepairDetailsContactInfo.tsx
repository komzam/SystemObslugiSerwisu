import {Card} from "@/components/Atoms/Card";
import {LabeledText} from "@/components/Molecules/LabeledText";
import {useTranslations} from "next-intl";
import {ContactMethod} from "@/__generated__/types";
import {getEnumKeyByValue} from "@/components/Utils/Enum";
import {LuMail, LuPhone, LuUser} from "react-icons/lu";

type RepairDetailsContactInfoProps = {
    fullName: string;
    email: string;
    phoneNumber: string;
    preferredContactMethod: ContactMethod;
}

export function RepairDetailsContactInfo({fullName, email, phoneNumber, preferredContactMethod}: RepairDetailsContactInfoProps) {
    const t = useTranslations("RepairDetails");
    const tMethods = useTranslations("ContactMethods");

    return (
        <Card>
            <Card.Label>{t("contactInfo")}</Card.Label>
            <div className="flex flex-col gap-5">
                <LabeledText className="overflow-hidden text-ellipsis" labelIcon={<LuUser/>} label={`${t("fullName")} / ${t("companyName")}`}>
                    {fullName}
                </LabeledText>
                <LabeledText className="overflow-hidden text-ellipsis" labelIcon={<LuMail/>} label={t("email")}>{email}</LabeledText>
                <LabeledText className="overflow-hidden text-ellipsis" labelIcon={<LuPhone/>} label={t("phoneNumber")}>{phoneNumber}</LabeledText>
                <LabeledText className="overflow-hidden text-ellipsis" label={t("preferredContactMethod")}>{tMethods(getEnumKeyByValue(ContactMethod, preferredContactMethod)??"")}</LabeledText>
            </div>
        </Card>
    );
}