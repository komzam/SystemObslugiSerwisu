import {Button} from "@/app/Atoms/Button";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

export function SignInButton() {
    const t = useTranslations("SignIn");

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <Button className="w-full">{t("signInButton")}</Button>
            <span className={"text-center"}>
                {t("registerButton1")}<br />
                <Link className="text-primary font-bold" href="/register">{t("registerButton2")}</Link>
            </span>
        </div>
    );
}