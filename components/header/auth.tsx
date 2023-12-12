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
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { checkUsername } from "@/api/Auth/checkUsername";
import { postSignUp } from "@/api/Auth/signup";
import { notifications } from "@mantine/notifications";
import { HiEmojiSad, HiBadgeCheck, HiFingerPrint } from "react-icons/hi";
import { API_URL } from "@/config/config";
import { IsValidUsername } from "@/utils/valid";
import { rename } from "@/api/user/rename";
import { hasCookie } from "cookies-next";
import { checkAuthorizationa } from "@/api/Auth/checkAuthorizationa";

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
  rename: string;
  successfulOauthSignup: string;
  successfulOauthsignupMessage: string;
  pleaseUpdateYourName: string;
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
  const [
    RenameModalStatus,
    { toggle: RenameModalOpen, close: RenameModalClose },
  ] = useDisclosure(false);
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
      email: (value) =>
        /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]$/.test(value)
          ? null
          : t.invalidEmail,
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
    } else if (IsValidUsername(username)) {
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
    // post to backend
    const res = await postSignUp(
      signupform.values.username,
      signupform.values.password,
      signupform.values.email
    );
    if (res.status == 200) {
      signupClose();
      notifications.show({
        color: "green",
        title: t.successfulOauthSignup,
        message: t.successfulOauthsignupMessage,
        icon: <HiBadgeCheck size={25} />,
        classNames: classes,
        autoClose: 5000,
      });
      signupform.reset();
    }
    if (res.data.message == "This email address is already in use") {
      signupform.setErrors({ email: t.emailHasBeenUse });
    }
    if (res.data.message == "This username is already in use") {
      signupform.setErrors({ email: t.usernameHasBeenUse });
    }
    if (res.status == 500) {
      signupClose();
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
              <Google
                t={t}
                signupLoading={loading}
                signupClose={signupClose}
                RenameModalOpen={RenameModalOpen}
              />
              <Github
                t={t}
                signupLoading={loading}
                signupClose={signupClose}
                RenameModalOpen={RenameModalOpen}
              />
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
      <RenameModal
        t={t}
        RenameModalStatus={RenameModalStatus}
        RenameModalClose={RenameModalClose}
      ></RenameModal>
    </>
  );
}

export function Google({
  t,
  signupLoading,
  signupClose,
  RenameModalOpen,
}: {
  t: language;
  signupLoading: boolean;
  signupClose: () => void;
  RenameModalOpen: () => void;
}) {
  const [loading, setLoading] = useState(false);
  // open a popup windows
  const handleOpenWindow = () => {
    setLoading(true);
    var screen_width = window.screen.width;
    var screen_height = window.screen.height;
    var left_position = (screen_width - 640) / 2;
    var top_position = (screen_height - 668) / 2;
    var window_features =
      "width=640,height=668,left=" + left_position + ",top=" + top_position;
    const popup = window.open(
      API_URL + "/auth/oauth/google",
      "_blank",
      window_features
    );

    if (popup) {
      // check is the windows be closed
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup);
          setLoading(false);
          if (hasCookie("first_login")) {
            signupClose();
            RenameModalOpen();
          } else {
            const fetchCheckAuthorizationa = async () => {
              const res = await checkAuthorizationa();
              if (res.status == 200) {
                signupClose();
              } else {
              }
            };
            fetchCheckAuthorizationa();
          }
        }
      }, 100);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        radius="xl"
        size="md"
        disabled={signupLoading}
        loading={loading}
        className={classes.outlinebutton}
        onClick={() => handleOpenWindow()}
      >
        <FcGoogle />
        <Space w="xs" />
        Google
      </Button>
    </>
  );
}

export function Github({
  t,
  signupLoading,
  signupClose,
  RenameModalOpen,
}: {
  t: language;
  signupLoading: boolean;
  signupClose: () => void;
  RenameModalOpen: () => void;
}) {
  const [loading, setLoading] = useState(false);
  // open a popup windows
  const handleOpenWindow = () => {
    setLoading(true);
    var screen_width = window.screen.width;
    var screen_height = window.screen.height;
    var left_position = (screen_width - 640) / 2;
    var top_position = (screen_height - 668) / 2;
    var window_features =
      "width=640,height=668,left=" + left_position + ",top=" + top_position;
    const popup = window.open(
      API_URL + "/auth/oauth/github",
      "_blank",
      window_features
    );

    if (popup) {
      // check is the windows be closed
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          signupClose();
          clearInterval(checkPopup);
          setLoading(false);
          if (hasCookie("first_login")) {
            RenameModalOpen();
          } else {
            const fetchCheckAuthorizationa = async () => {
              const res = await checkAuthorizationa();
              if (res.status == 200) {
                signupClose();
              } else {
              }
            };
            fetchCheckAuthorizationa();
          }
        }
      }, 100);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        radius="xl"
        size="md"
        disabled={signupLoading}
        loading={loading}
        className={classes.outlinebutton}
        onClick={() => handleOpenWindow()}
      >
        <FaGithub className={classes.icon}></FaGithub>
        <Space w="xs" />
        Github
      </Button>
    </>
  );
}

function RenameModal({
  t,
  RenameModalStatus,
  RenameModalClose,
}: {
  t: language;
  RenameModalStatus: boolean;
  RenameModalClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  // when username has not edit in 200ms than change the username
  const [username, setUsername] = useDebouncedState("", 200);
  // if the username variable is change than check the username is been use or not
  const fetchCheckUsername = async () => {
    if (username.length === 0) {
      return;
    }
    // get api to check username is been use or not
    const res = await checkUsername(username);
    if (res.data.inuse) {
      setUsernameError(t.usernameHasBeenUse);
    } else if (IsValidUsername(username)) {
      setUsernameError("");
    } else {
      setUsernameError(t.invalidUsername);
    }
  };
  useEffect(() => {
    fetchCheckUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const renameFunction = async () => {
    setLoading(true);
    // if the username have nothing
    if (username.length === 0) {
      setUsernameError(t.pleaseEnterAUsername);
      setLoading(false);
      return;
    // if have error
    } else if (usernameError != "") {
      setLoading(false);
      return;
    } else {
      console.log(usernameError);
      console.log(usernameError != "");
      console.log(username.length);
      const res = await rename(username);
      if (res.status == 200) {
        RenameModalClose();
        notifications.show({
          color: "green",
          title: t.successfulOauthSignup,
          message: t.successfulOauthsignupMessage,
          icon: <HiBadgeCheck size={25} />,
          classNames: classes,
          autoClose: 5000,
        });
      } else {
        setUsernameError(t.invalidUsername);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        opened={RenameModalStatus}
        onClose={RenameModalClose}
        radius="md"
        title={
          <Center w="100%">
            <Text fw={700} size="xl">
              {t.pleaseUpdateYourName}
            </Text>
          </Center>
        }
      >
        <Stack className={classes.modelPadding}>
          <TextInput
            label={<Text fw={700}>{t.username}</Text>}
            size="md"
            type="username"
            placeholder={t.typeUsername}
            radius="md"
            error={usernameError}
            disabled={loading}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
          <Divider my="xs" labelPosition="center" />
          <Button
            variant="filled"
            radius="md"
            size="sm"
            leftSection={<HiFingerPrint />}
            className={classes.outlinebutton}
            type="submit"
            loading={loading}
            fullWidth
            onClick={renameFunction}
          >
            {t.rename}
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
