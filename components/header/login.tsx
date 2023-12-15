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
  PasswordInput,
  Anchor,
} from "@mantine/core";
import classes from "./Header.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";
import { notifications } from "@mantine/notifications";
import { HiEmojiSad, HiBadgeCheck } from "react-icons/hi";
import { API_URL } from "@/config/config";
import { hasCookie } from "cookies-next";
import { checkAuthorizationa } from "@/api/Auth/checkAuthorizationa";
import { postLogin } from "@/api/Auth/login";
import { HeaderLanguage } from "./Header";
import { GetAvatar } from "@/api/user/getAvatar";

// Login components
export function LoginComponents({
  t,
  loginOppened,
  loginOpen,
  loginClose,
  signupOpen,
  setAvatar,
  fullWidth
}: {
  t: HeaderLanguage;
  loginOppened: boolean;
  loginOpen: () => void;
  loginClose: () => void;
  signupOpen: () => void;
  setAvatar: Dispatch<SetStateAction<string>>;
  fullWidth: boolean;
}) {
  // if post login and the process are loading
  const [loading, setLoading] = useState(false);
  // set signup form(mantine components)
  const loginform = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]$/.test(value)
          ? null
          : t.invalidEmail,
    },
  });

  //if user click the login button than post to the backend api
  const login = async () => {
    setLoading(true);
    // post to backend
    const res = await postLogin(
      loginform.values.email,
      loginform.values.password
    );
    if (res.status == 200) {
      loginClose();
      const fetchGetAvatar = async () => {
        const res = await GetAvatar();
        if (res.status == 200) {
          setAvatar(res.data.data);
        }
      };
      fetchGetAvatar();
      notifications.show({
        color: "green",
        title: t.successfulOauthSignup,
        message: t.successfulOauthsignupMessage,
        icon: <HiBadgeCheck size={25} />,
        classNames: classes,
        autoClose: 5000,
      });
      loginform.reset();
    }

    if (res.status == 401) {
      loginform.setErrors({
        email: t.invalidEmailOrPassword,
        password: t.invalidEmailOrPassword,
      });
    }
    if (res.status == 500) {
      loginClose();
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

  const changeToSignupModal = () => {
    loginClose();
    signupOpen();
  };
  return (
    <>
      <Button
        variant="outline"
        radius="md"
        className={classes.outlinebutton}
        onClick={loginOpen}
        fullWidth={fullWidth}
      >
        {t.logIn}
      </Button>

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
        <form
          onSubmit={loginform.onSubmit(() => {
            login();
          })}
        >
          <Stack className={classes.modelPadding}>
            <TextInput
              disabled={loading}
              size="md"
              type="email"
              label={<Text fw={700}>{t.email}</Text>}
              placeholder={t.typeEmail}
              radius="md"
              {...loginform.getInputProps("email")}
            />
            <PasswordInput
              disabled={loading}
              size="md"
              label={<Text fw={700}>{t.password}</Text>}
              placeholder={t.typePassword}
              radius="md"
              {...loginform.getInputProps("password")}
            />
            <Divider my="xs" labelPosition="center" label={t.orLoginWith} />
            <Group grow justify="space-between">
              <Google
                t={t}
                loginLoading={loading}
                loginClose={loginClose}
                setAvatar={setAvatar}
              ></Google>
              <Github
                t={t}
                loginLoading={loading}
                loginClose={loginClose}
                setAvatar={setAvatar}
              ></Github>
            </Group>
            <Group justify="space-between">
              <Text size="sm">
                {t.noAccount + " "}
                <Anchor onClick={() => changeToSignupModal()}>
                  {t.createOne}
                </Anchor>
              </Text>
              <Button
                loading={loading}
                variant="filled"
                radius="md"
                size="sm"
                className={classes.outlinebutton}
                type="submit"
              >
                {t.logIn}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

export function Google({
  t,
  loginLoading,
  loginClose,
  setAvatar,
}: {
  t: HeaderLanguage;
  loginLoading: boolean;
  loginClose: () => void;
  setAvatar: Dispatch<SetStateAction<string>>;
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
          const fetchCheckAuthorizationa = async () => {
            const res = await checkAuthorizationa();
            if (res.status == 200) {
              loginClose();
              const fetchGetAvatar = async () => {
                const res = await GetAvatar();
                if (res.status == 200) {
                  setAvatar(res.data.data);
                }
              };
              fetchGetAvatar();
              notifications.show({
                color: "green",
                title: t.successfulLogin,
                message: t.successfulLoginMessage,
                icon: <HiBadgeCheck size={25} />,
                classNames: classes,
                autoClose: 5000,
              });
            }
          };
          fetchCheckAuthorizationa();
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
        disabled={loginLoading}
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
  loginLoading,
  loginClose,
  setAvatar,
}: {
  t: HeaderLanguage;
  loginLoading: boolean;
  loginClose: () => void;
  setAvatar: Dispatch<SetStateAction<string>>;
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
          clearInterval(checkPopup);
          setLoading(false);
          const fetchCheckAuthorizationa = async () => {
            const res = await checkAuthorizationa();
            if (res.status == 200) {
              loginClose();
              const fetchGetAvatar = async () => {
                const res = await GetAvatar();
                if (res.status == 200) {
                  setAvatar(res.data.data);
                }
              };
              fetchGetAvatar();
              notifications.show({
                color: "green",
                title: t.successfulLogin,
                message: t.successfulLoginMessage,
                icon: <HiBadgeCheck size={25} />,
                classNames: classes,
                autoClose: 5000,
              });
            }
          };
          fetchCheckAuthorizationa();
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
        disabled={loginLoading}
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
