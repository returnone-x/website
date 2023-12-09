"use client";

import {
  Text,
  Button,
  Center,
  Modal,
  TextInput,
  Stack,
  Divider,
  Group,
  Space,
  Checkbox,
  PasswordInput,
} from "@mantine/core";
import classes from "./Header.module.css";
import { useDisclosure } from "@mantine/hooks";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
type language = {
  logIn: string;
  signUp: string;
  userName: string;
  password: string;
  email: string;
  typeUserName: string;
  typePassword: string;
  typeEmail: string;
  signInToReturnone: string;
  signUpForReturnone: string;
  iAgreeTerms: string;
  alreadyHaveAccount: string;
  noAccount: string;
  createOne: string;
  orLoginWith: string;
  orSignupWith: string;
};

export function SignupLogin({ t }: { t: language }) {
  const [loginOppened, { toggle: loginOpen, close: loginClose }] =
    useDisclosure(false);
  const [signupOppened, { toggle: signupOpen, close: signupClose }] =
    useDisclosure(false);

  const LoginModalTitle = (
    <Center w="100%">
      <Text fw={700} size="xl">
        {t.signInToReturnone}
      </Text>
    </Center>
  );

  const SignupModalTitle = (
    <Center w="100%">
      <Text fw={700} size="xl">
        {t.signUpForReturnone}
      </Text>
    </Center>
  );

  return (
    <>
      <Button
        variant="outline"
        radius="md"
        className={classes.outlinebutton}
        onClick={loginOpen}
      >
        {t.logIn}
      </Button>
      <Button variant="filled" radius="md" onClick={signupOpen}>
        {t.signUp}
      </Button>

      {
        // Login Modal
      }
      <Modal
        opened={loginOppened}
        onClose={loginClose}
        radius="md"
        title={LoginModalTitle}
      >
        <Stack className={classes.modelPadding}>
          <TextInput
            size="md"
            type="email"
            label={<Text fw={700}>{t.email}</Text>}
            placeholder={t.typeEmail}
            radius="md"
          />
          <PasswordInput
            size="md"
            label={<Text fw={700}>{t.password}</Text>}
            placeholder={t.typePassword}
            radius="md"
          />
          <Divider my="xs" labelPosition="center" label={t.orLoginWith} />
          <Group grow justify="space-between">
            <Button
              variant="outline"
              radius="xl"
              size="md"
              className={classes.outlinebutton}
            >
              <FcGoogle />
              <Space w="xs" />
              Google
            </Button>
            <Button
              variant="outline"
              radius="xl"
              size="md"
              className={classes.outlinebutton}
            >
              <FaGithub className={classes.icon}></FaGithub>
              <Space w="xs" />
              Github
            </Button>
          </Group>
          <Group justify="space-between">
            <Text size="sm">
              {t.noAccount} {t.createOne}
            </Text>
            <Button
              variant="filled"
              radius="md"
              size="sm"
              className={classes.outlinebutton}
            >
              {t.logIn}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {
        // Sign up Modal
      }
      <Modal
        opened={signupOppened}
        onClose={signupClose}
        radius="md"
        title={SignupModalTitle}
      >
        <Stack className={classes.modelPadding}>
          <TextInput
            label={<Text fw={700}>{t.userName}</Text>}
            size="md"
            type="username"
            placeholder={t.typeUserName}
            radius="md"
          />
          <TextInput
            label={<Text fw={700}>{t.email}</Text>}
            size="md"
            type="email"
            placeholder={t.typeEmail}
            radius="md"
          />
          <PasswordInput
            label={<Text fw={700}>{t.password}</Text>}
            size="md"
            placeholder={t.typePassword}
            radius="md"
          />
          <Divider my="xs" labelPosition="center" label={t.orSignupWith} />
          <Group grow justify="space-between">
            <Button
              variant="outline"
              radius="xl"
              size="md"
              className={classes.outlinebutton}
            >
              <FcGoogle />
              <Space w="xs" />
              Google
            </Button>
            <Button
              variant="outline"
              radius="xl"
              size="md"
              className={classes.outlinebutton}
            >
              <FaGithub className={classes.icon}></FaGithub>
              <Space w="xs" />
              Github
            </Button>
          </Group>
          <Space h="xs" />
          <Checkbox label={t.iAgreeTerms} radius="md" />
          <Group justify="space-between">
            <Text size="sm">
              {t.alreadyHaveAccount} {t.logIn}
            </Text>
            <Button
              variant="filled"
              radius="md"
              size="sm"
              className={classes.outlinebutton}
            >
              {t.logIn}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
