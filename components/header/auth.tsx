"use client";

import { useDisclosure } from "@mantine/hooks";
import { LoginComponents } from "./login";
import { SignupComponents } from "./signup";
import { HeaderLanguage } from "./Header";
import { useState } from "react";
import { Avatar, Grid, Group } from "@mantine/core";
import { UserAvatarDropdown } from "./avatar";

// whole components
export function SignupLogin({
  t,
  visibleFrom,
}: {
  t: HeaderLanguage;
  visibleFrom: string;
}) {
  const [avatar, setAvatar] = useState("");
  const [signupOppened, { toggle: signupOpen, close: signupClose }] =
    useDisclosure(false);
  const [loginOppened, { toggle: loginOpen, close: loginClose }] =
    useDisclosure(false);
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
            <LoginComponents
              t={t}
              loginOppened={loginOppened}
              loginOpen={loginOpen}
              loginClose={loginClose}
              signupOpen={signupOpen}
              setAvatar={setAvatar}
              fullWidth={true}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <SignupComponents
              t={t}
              signupOppened={signupOppened}
              signupOpen={signupOpen}
              signupClose={signupClose}
              loginOpen={loginOpen}
              setAvatar={setAvatar}
              fullWidth={true}
            />
          </Grid.Col>
        </Grid>
      );
    } else {
      return (
        <Group justify="space-between" gap="sm" visibleFrom={visibleFrom}>
          <LoginComponents
            t={t}
            loginOppened={loginOppened}
            loginOpen={loginOpen}
            loginClose={loginClose}
            signupOpen={signupOpen}
            setAvatar={setAvatar}
            fullWidth={false}
          />
          <SignupComponents
            t={t}
            signupOppened={signupOppened}
            signupOpen={signupOpen}
            signupClose={signupClose}
            loginOpen={loginOpen}
            setAvatar={setAvatar}
            fullWidth={false}
          />
        </Group>
      );
    }
  }
}
