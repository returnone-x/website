import { HeaderComponent } from "@/components/header/Header";
import { useTranslations } from "next-intl";

export default function Home({
  params: { locale },
}: {
  params: { locale: "en" | "zh-tw" };
}) {
  const t = useTranslations("Header");
  const signipLoginTranslate = {
    signUp: t("signUp"),
    logIn: t("logIn"),
    search: t("search"),
    blog: t("blog"),
    aboutUs: t("aboutUs"),
    ask: t("ask"),
    logout: t("logout"),
    profile: t("profile"),
    setting: t("setting"),
  };
  return (
  <>
  <HeaderComponent t={signipLoginTranslate}/> 
  test
  </>
  );
}
