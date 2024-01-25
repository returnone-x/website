import { HeaderComponent } from "@/components/header/Header";
import { Space } from "@mantine/core";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import React from "react";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
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
    setting: t("setting")
  };
  return (
    <>
      <HeaderComponent t={signipLoginTranslate} />
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      {children}
    </>
  );
}
