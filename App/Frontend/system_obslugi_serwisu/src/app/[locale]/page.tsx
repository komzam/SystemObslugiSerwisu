import * as React from "react";
import {MainPageSearchBar} from "@/app/Organisms/MainPageSearchBar";
import {useTranslations} from "next-intl";

export default function Home() {
    const t = useTranslations("MainPage");
    return (
      <div className="bg-inherit flex flex-col">
          <div className="absolute top-16 left-0 right-0 bg-gradient-to-b from-primary to-background h-full -z-10"></div>
          <div className="w-full flex flex-col items-center gap-10 mt-20">
              <p className="text-white text-6xl font-bold text-center">{t("title")}</p>
              <p className="text-accent2 text-3xl text-center">{t("subtitle")}</p>
              <MainPageSearchBar></MainPageSearchBar>
          </div>
      </div>
    );
}
