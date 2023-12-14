"use client";

import { HiTranslate } from "react-icons/hi";
import classes from "./Header.module.css";
import { ActionIcon, Menu } from "@mantine/core";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "../i18nNavigation";
import { HiCheck } from "react-icons/hi";
import { locales } from "@/config/config";

const localsToLanguageName: { [key: string]: string } = {
  en: "English",
  "zh-tw": "繁體中文",
};

export function ChangeLanguage() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(language: string) {
    const nextLocale = language;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <>
      <Menu shadow="md" radius="lg">
        <Menu.Target>
          <ActionIcon
            variant="subtle"
            aria-label="i18n"
            visibleFrom="sm"
            className={classes.icon}
          >
            <HiTranslate size={25} className={classes.icon} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          {locales.map((cur) => (
            <Menu.Item
              key={cur}
              onClick={() => {
                onSelectChange(cur);
                window.location.reload();
              }}
            >
              {locale == cur ? (
                <>
                  <HiCheck color="green" /> {localsToLanguageName[cur]}
                </>
              ) : (
                localsToLanguageName[cur]
              )}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
