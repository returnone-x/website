import { useTranslations } from "next-intl";
import { HeaderComponent } from "@/components/header/Header";

export default function Home() {
  const t = useTranslations("Header");
  
  return <HeaderComponent t={t}/>;
}
