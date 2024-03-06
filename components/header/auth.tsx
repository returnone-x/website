"use client";

import { useDisclosure } from "@mantine/hooks";
import { HeaderLanguage } from "./Header";
import { useEffect, useState } from "react";
import { Avatar, Button, Grid, Group } from "@mantine/core";
import { UserAvatarDropdown } from "./avatar";
import classes from "./Header.module.css";
import { websiteUrl } from "@/config/config";
import { getCookie } from "cookies-next";
// whole components
export function SignupLogin({
  t,
  visibleFrom,
}: {
  t: HeaderLanguage;
  visibleFrom: string;
}) {
  const locale = getCookie("NEXT_LOCALE") || "en";
  const [fullURL, setFullURL] = useState(websiteUrl)
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setFullURL(window.location.href)
  }, [])

  if (avatar != "") {
    if (visibleFrom === "") {
      window.location.reload();
    }
    return <UserAvatarDropdown t={t} avatar={avatar} />;
  } else {
    if (visibleFrom === "") {
      return (
        <Grid hiddenFrom="sm">
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <Button
              component="a"
              href={websiteUrl + `/${locale}/login?r=${fullURL}`}
              variant="outline"
              radius="md"
              className={classes.outlinebutton}
              fullWidth
            >
              {t.logIn}
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <Button
              component="a"
              href={websiteUrl + `/${locale}/register?r=${fullURL}`}
              variant="filled"
              radius="md"
              fullWidth
            >
              {t.signUp}
            </Button>
          </Grid.Col>
        </Grid>
      );
    } else {
      return (
        <Group justify="space-between" gap="sm" visibleFrom={visibleFrom}>
          <Button
            component="a"
            href={websiteUrl + `/${locale}/login?r=${fullURL}`}
            variant="outline"
            radius="md"
            className={classes.outlinebutton}
          >
            {t.logIn}
          </Button>
          <Button
            variant="filled"
            radius="md"
            component="a"
            href={websiteUrl + `/${locale}/register?r=${fullURL}`}
          >
            {t.signUp}
          </Button>
        </Group>
      );
    }
  }
}
