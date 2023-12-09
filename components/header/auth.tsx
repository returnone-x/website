"use client";

import { ActionIcon, Button, Modal, TextInput } from "@mantine/core";
import classes from "./Header.module.css";
import { useDisclosure } from "@mantine/hooks";

type language = {
  login: string;
  signup: string;
  username: string;
  typeusername: string;
};

export function SignupLogin({ t }: { t: language }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        variant="outline"
        radius="md"
        className={classes.signup}
        onClick={open}
      >
        {t.login}
      </Button>
      <Button variant="filled" radius="md" onClick={open}>
        {t.signup}
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        withCloseButton={false}
      >
        <TextInput
          label={t.username}
          withAsterisk
          placeholder={t.typeusername}
          radius="lg"
        />
      </Modal>
    </>
  );
}
