import {Button} from "@/components/Atoms/Button";
import {useTranslations} from "next-intl";

export type RepairFormNavButtonsProps = {
    leftBtnName?: string;
    rightBtnName?: string;
    leftBtnVisible?: boolean;
    rightBtnVisible?: boolean;
    leftBtnOnClick?: ()=>void;
    rightBtnOnClick?: ()=>void;
}

export function RepairFormNavButtons({leftBtnName, rightBtnName, leftBtnVisible = true, rightBtnVisible = true, leftBtnOnClick, rightBtnOnClick}: RepairFormNavButtonsProps) {
    const t = useTranslations("RepairForm.navigationButtons");
    return(
        <div className="flex justify-between w-full">
            <Button variant="secondary" className={!leftBtnVisible ? "invisible" : ""} onClick={leftBtnOnClick}>
                {leftBtnName != undefined? leftBtnName : t("previous")}
            </Button>
            <Button className={!rightBtnVisible ? "invisible" : ""} onClick={rightBtnOnClick}>
                {rightBtnName != undefined? rightBtnName : t("next")}
            </Button>
        </div>
    )
}