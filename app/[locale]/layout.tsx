import { HeaderComponent } from "@/components/header/Header";
import { notFound } from "next/navigation";
import React from "react";

// Can be imported from a shared config
const locales = ["en", "zh-tw"];

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: "en" | "zh-tw" };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}
