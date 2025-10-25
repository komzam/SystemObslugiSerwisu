import {useTranslations} from "next-intl";
import {ContactInfoForm} from "@/app/Molecules/ContactInfoForm";
import {ReturnInfoForm} from "@/app/Molecules/ReturnInfoForm";
import {OtherInfoForm} from "@/app/Molecules/OtherInfoForm";


export function AdditionalInfoForm() {
    const t = useTranslations("RepairForm.additionalInfo");

    return(
        <div className="bg-inherit flex flex-col gap-7 w-full">
            <div className="bg-inherit">
                <span className="text-larger2 font-bold">{t("contactInformation")}</span>
                <ContactInfoForm/>
            </div>
            <div className="bg-inherit">
                <span className="text-larger2 font-bold">{t("returnInformation")}</span>
                <ReturnInfoForm/>
            </div>
            <div className="bg-inherit">
                <span className="text-larger2 font-bold">{t("otherInformation")}</span>
                <OtherInfoForm/>
            </div>
        </div>
    )
}