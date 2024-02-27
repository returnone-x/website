"use client";

import { Card, Title, Transition } from "@mantine/core";
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
import classes from "./Auth.module.css";
import { useForm } from "@mantine/form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { HiEmojiSad, HiBadgeCheck, HiCheckCircle } from "react-icons/hi";
import { API_URL, websiteUrl } from "@/config/config";
import { checkAuthorizationa } from "@/api/Auth/checkAuthorizationa";
import { postLogin } from "@/api/Auth/login";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";

export type AuthLanguage = {
  signUpForReturnone: string;
  iAgreeTerms: string;
  passwordIsTooWeak: string;
  passwordDidNotMatch: string;
  invalidUsername: string;
  pleaseEnterAUsername: string;
  usernameHasBeenUse: string;
  successfulOauthSignup: string;
  successfulOauthsignupMessage: string;
  emailHasBeenUse: string;
  alreadyHaveAccount: string;
  orSignupWith: string;
  rename: string;
  pleaseUpdateYourName: string;
  typeUsername: string;
  username: string;
  confirmPassword: string;
  invalidEmail: string;
  successfulLoginMessage: string;
  invalidEmailOrPassword: string;
  anUnexpectedErrorOccurred: string;
  pleaseTryAgainLater: string;
  signInToReturnone: string;
  typeEmail: string;
  password: string;
  logIn: string;
  signUp: string;
  email: string;
  typePassword: string;
  orLoginWith: string;
  noAccount: string;
  createOne: string;
  successfulLogin: string;
};

export function LoginComponents({ t }: { t: AuthLanguage }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("r");
  const [loginOpen, setLoginOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoginOpen(true);
    }, 1);
  }, []);
  return (
    <div className={classes.fullScreen}>
      <Center maw={"100%"} h={"100%"}>
        <Transition
          mounted={loginOpen}
          transition="scale-x"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Card shadow="sm" radius="lg" padding="md" w={"500px"}>
                <Center w={"100%"}>
                  <Title order={2}>{t.signInToReturnone}</Title>
                </Center>
                <Space h="xl" />
                <LoginComponentsModal
                  t={t}
                  redirectUrl={
                    redirect ? decodeURIComponent(redirect) : websiteUrl
                  }
                  setLoginOpen={setLoginOpen}
                />
              </Card>
            </div>
          )}
        </Transition>
      </Center>
    </div>
  );
}

// Login components
export function LoginComponentsModal({
  t,
  redirectUrl,
  setLoginOpen,
}: {
  t: AuthLanguage;
  redirectUrl: string;
  setLoginOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const locale = getCookie("NEXT_LOCALE") || "en";
  const router = useRouter();
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
      notifications.show({
        color: "green",
        title: t.successfulLogin,
        message: t.successfulLoginMessage,
        icon: <HiCheckCircle size={30} />,
        classNames: classes,
        autoClose: 5000,
      });
      loginform.reset();
      window.location.href = redirectUrl
    }

    if (res.status == 401) {
      loginform.setErrors({
        email: t.invalidEmailOrPassword,
        password: t.invalidEmailOrPassword,
      });
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
              redirectUrl={redirectUrl}
            ></Google>
            <Github
              t={t}
              loginLoading={loading}
              redirectUrl={redirectUrl}
            ></Github>
          </Group>
          <Group justify="space-between">
            <Text size="sm">
              {t.noAccount + " "}
              <Anchor
                onClick={() => {
                  setLoginOpen(false);
                  router.push(`/${locale}/register?r=` + redirectUrl);
                }}
              >
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
    </>
  );
}

export function Google({
  t,
  loginLoading,
  redirectUrl,
}: {
  t: AuthLanguage;
  loginLoading: boolean;
  redirectUrl: string;
}) {
  const router = useRouter();
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
              notifications.show({
                color: "green",
                title: t.successfulLogin,
                message: t.successfulLoginMessage,
                icon: <HiCheckCircle size={30} />,
                classNames: classes,
                autoClose: 5000,
              });
              // redrict
              window.location.href = redirectUrl;
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
  redirectUrl,
}: {
  t: AuthLanguage;
  loginLoading: boolean;
  redirectUrl: string;
}) {
  const router = useRouter();
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
              notifications.show({
                color: "green",
                title: t.successfulLogin,
                message: t.successfulLoginMessage,
                icon: <HiCheckCircle size={30} />,
                classNames: classes,
                autoClose: 5000,
              });
              //redrict
              window.location.href = redirectUrl;
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
