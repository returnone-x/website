import { HeaderComponent } from "@/components/header/Header";
import { locales } from "@/config/config";
import { notFound } from "next/navigation";
import React from "react";

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
