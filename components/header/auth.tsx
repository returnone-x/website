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
import {
  useDebouncedState,
  useDebouncedValue,
  useDisclosure,
} from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { values } from "lodash";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { checkUsername } from "@/api/Auth/checkUsername";
import { postSignUp } from "@/api/Auth/signup";
import { notifications } from "@mantine/notifications";
import { HiEmojiSad } from "react-icons/hi";

// set t type
type language = {
  logIn: string;
  signUp: string;
  username: string;
  password: string;
  email: string;
  typeUsername: string;
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
  confirmPassword: string;
  invalidEmail: string;
  passwordIsTooWeak: string;
  passwordDidNotMatch: string;
  invalidUsername: string;
  usernameHasBeenUse: string;
  emailHasBeenUse: string;
  anUnexpectedErrorOccurred: string;
  pleaseTryAgainLater: string;
  pleaseEnterAUsername: string;
};

// whole components
export function SignupLogin({ t }: { t: language }) {
  return (
    <>
      <LoginComponents t={t} />
      <SignupComponents t={t} />
    </>
  );
}

// Login components
export function LoginComponents({ t }: { t: language }) {
  // set modal open and close
  const [loginOppened, { toggle: loginOpen, close: loginClose }] =
    useDisclosure(false);

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
      {
        // Login Modal
      }
      <Modal
        opened={loginOppened}
        onClose={loginClose}
        radius="md"
        title={
          <Center w="100%">
            <Text fw={700} size="xl">
              {t.signInToReturnone}
            </Text>
          </Center>
        }
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
    </>
  );
}

export function SignupComponents({ t }: { t: language }) {
  // if post sign and the process are loading
  const [loading, setLoading] = useState(false);
  // set modal open or close
  const [signupOppened, { toggle: signupOpen, close: signupClose }] =
    useDisclosure(false);

  // cuz username need update frequently to let user know does this username is available
  const [usernameError, setUsernameError] = useState("");
  // set signup form(mantine components)
  const signupform = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      // username cuz need update frequently so use this way (i know this is so stupid)
      username: (value) => (usernameError === "" ? null : usernameError),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t.invalidEmail),
      password: (value) =>
        !["Too weak"].includes(passwordStrength(value).value)
          ? null
          : t.passwordIsTooWeak,
      confirmPassword: (value, values) =>
        value !== values.password ? t.passwordDidNotMatch : null,
    },
  });

  // set username and this will delay 300ms (need rate the api)
  const [username] = useDebouncedValue(signupform.values.username, 300);
  
  // if the username variable is change than check the username is been use or not
  const fetchCheckUsername = async () => {
    // username have no type then just set error to the UsernameError (Because I don't want the user to have an error without even typing anything)
    if (username.length === 0) {
      setUsernameError(t.pleaseEnterAUsername);
      return;
    }
    // get api to check username is been use or not
    const res = await checkUsername(username);
    if (res.data.inuse) {
      signupform.setErrors({ username: t.usernameHasBeenUse });
      setUsernameError(t.usernameHasBeenUse);
    } else if (
      /^[a-zA-Z0-9](?:[a-zA-Z0-9]|[_](?=[a-zA-Z0-9]))*[a-zA-Z0-9]$/.test(
        username
      )
    ) {
      signupform.setErrors({ username: null });
      setUsernameError("");
    } else {
      signupform.setErrors({ username: t.invalidUsername });
      setUsernameError(t.invalidUsername);
    }
  };
  useEffect(() => {
    fetchCheckUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  //if user click the signup button than post to the backend api
  const signUp = async () => {
    setLoading(true);
    const res = await postSignUp(
      signupform.values.username,
      signupform.values.password,
      signupform.values.email
    );
    if (res.status == 200) {
      signupClose();
      signupform.reset();
    }
    if (res.data.message == "This email address is already in use") {
      signupform.setErrors({ email: t.emailHasBeenUse });
    }
    if (res.data.message == "This username is already in use") {
      signupform.setErrors({ email: t.usernameHasBeenUse });
    }
    if (res.status == 500) {
      notifications.show({
        color: "red",
        title: t.anUnexpectedErrorOccurred,
        message: t.pleaseTryAgainLater + "\n" + res.data.error,
        icon: <HiEmojiSad size={25} />,
        classNames: classes,
        autoClose: 5000,
      });
    }
    setLoading(false);
  };
  
  return (
    <>
      <Button variant="filled" radius="md" onClick={signupOpen}>
        {t.signUp}
      </Button>

      <Modal
        opened={signupOppened}
        onClose={signupClose}
        radius="md"
        title={
          <Center w="100%">
            <Text fw={700} size="xl">
              {t.signUpForReturnone}
            </Text>
          </Center>
        }
      >
        <form
          onSubmit={signupform.onSubmit(() => {
            signUp();
          })}
        >
          <Stack className={classes.modelPadding}>
            <TextInput
              label={<Text fw={700}>{t.username}</Text>}
              size="md"
              type="username"
              placeholder={t.typeUsername}
              radius="md"
              disabled={loading}
              {...signupform.getInputProps("username")}
            />
            <TextInput
              label={<Text fw={700}>{t.email}</Text>}
              size="md"
              type="email"
              placeholder={t.typeEmail}
              radius="md"
              disabled={loading}
              {...signupform.getInputProps("email")}
            />
            <PasswordInput
              label={<Text fw={700}>{t.password}</Text>}
              size="md"
              placeholder={t.typePassword}
              radius="md"
              disabled={loading}
              {...signupform.getInputProps("password")}
            />
            <PasswordInput
              label={<Text fw={700}>{t.confirmPassword}</Text>}
              size="md"
              placeholder={t.typePassword}
              radius="md"
              disabled={loading}
              {...signupform.getInputProps("confirmPassword")}
            />
            <Divider my="xs" labelPosition="center" label={t.orSignupWith} />
            <Group grow justify="space-between">
              <Button
                variant="outline"
                radius="xl"
                size="md"
                disabled={loading}
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
                disabled={loading}
                className={classes.outlinebutton}
              >
                <FaGithub className={classes.icon}></FaGithub>
                <Space w="xs" />
                Github
              </Button>
            </Group>
            <Space h="xs" />
            <Text size="xs">{t.iAgreeTerms}</Text>
            <Group justify="space-between">
              <Text size="sm">
                {t.alreadyHaveAccount} {t.logIn}
              </Text>
              <Button
                variant="filled"
                radius="md"
                size="sm"
                className={classes.outlinebutton}
                type="submit"
                loading={loading}
              >
                {t.signUp}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
