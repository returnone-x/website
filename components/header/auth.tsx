"use client";

import { useDisclosure } from "@mantine/hooks";
import { LoginComponents } from "./login";
import { SignupComponents } from "./signup";
import { HeaderLanguage } from "./Header";
import { useState } from "react";
import { Avatar } from "@mantine/core";

// whole components
export function SignupLogin({ t }: { t: HeaderLanguage }) {
  const [avatar, setAvatar] = useState("");
  const [signupOppened, { toggle: signupOpen, close: signupClose }] =
    useDisclosure(false);
  const [loginOppened, { toggle: loginOpen, close: loginClose }] =
    useDisclosure(false);
  if (avatar != "") {
    return <Avatar variant="filled" radius="md" src={avatar} />;
  } else {
    return (
      <>
        <LoginComponents
          t={t}
          loginOppened={loginOppened}
          loginOpen={loginOpen}
          loginClose={loginClose}
          signupOpen={signupOpen}
          setAvatar={setAvatar}
        />
        <SignupComponents
          t={t}
          signupOppened={signupOppened}
          signupOpen={signupOpen}
          signupClose={signupClose}
          loginOpen={loginOpen}
          setAvatar={setAvatar}
        />
      </>
    );
  }
}
