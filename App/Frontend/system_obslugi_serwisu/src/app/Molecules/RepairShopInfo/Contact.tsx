import {useTranslations} from "next-intl";
import {LuPhone} from "react-icons/lu";
import {IconAndTitle} from "./IconAndTitle";

export type ContactProps = {phone:string, email:string}
export function Contact({phone, email}: ContactProps) {
    const t = useTranslations("RepairShop");
    return(
        <IconAndTitle icon={<LuPhone className="text-accent4"/>} title={t("contact")}>
            <p>{phone}</p>
            <p>{email}</p>
        </IconAndTitle>
    )
}