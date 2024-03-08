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
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { HiEmojiSad, HiBadgeCheck, HiFingerPrint, HiCheckCircle } from "react-icons/hi";
import { API_URL, websiteUrl } from "@/config/config";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useDebouncedState,
  useDebouncedValue,
  useDisclosure,
} from "@mantine/hooks";
import { passwordStrength } from "check-password-strength";
import { checkUsername } from "@/api/Auth/checkUsername";
import { postSignUp } from "@/api/Auth/signup";
import { IsValidUsername } from "@/utils/valid";
import { rename } from "@/api/user/rename";
import { hasCookie } from "cookies-next";
import { AuthLanguage } from "./login";

export function SignupComponent({ t }: { t: AuthLanguage }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("r");
  const [renameOpen, setRenameOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSignupOpen(true);
    }, 1);
  }, []);
  return (
    <div className={classes.fullScreen}>
      <Center maw={"100%"} h={"100%"}>
        <Transition
          mounted={signupOpen}
          transition="scale-x"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Card shadow="sm" radius="lg" padding="md" w={"500px"}>
                <Center w={"100%"}>
                  <Title order={2}>{t.signUpForReturnone}</Title>
                </Center>
                <Space h="xl" />
                <SignupComponentsModal
                  t={t}
                  redirectUrl={
                    redirect ? decodeURIComponent(redirect) : websiteUrl
                  }
                  setSignupOpen={setSignupOpen}
                  setRenameOpen={setRenameOpen}
                />
              </Card>
            </div>
          )}
        </Transition>
        <Transition
          mounted={renameOpen}
          transition="scale-x"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Card shadow="sm" radius="lg" padding="md" w={"500px"}>
                <Center w={"100%"}>
                  <Title order={2}>{t.pleaseUpdateYourName}</Title>
                </Center>
                <Space h="xl" />
                <RenameModal
                  t={t}
                  redirectUrl={
                    redirect ? decodeURIComponent(redirect) : websiteUrl
                  }
                />
              </Card>
            </div>
          )}
        </Transition>
      </Center>
    </div>
  );
}

export function SignupComponentsModal({
  t,
  redirectUrl,
  setSignupOpen,
  setRenameOpen,
}: {
  t: AuthLanguage;
  redirectUrl: string;
  setSignupOpen: Dispatch<SetStateAction<boolean>>;
  setRenameOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  // if post sign and the process are loading
  const [loading, setLoading] = useState(false);

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
      notifications.show({
        color: "green",
        title: t.successfulOauthSignup,
        message: t.successfulOauthsignupMessage,
        icon: <HiCheckCircle size={30} />,
        classNames: classes,
        autoClose: 5000,
      });
      signupform.reset();
      window.location.href = redirectUrl;
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
              redirectUrl={redirectUrl}
              setSignupOpen={setSignupOpen}
              setRenameOpen={setRenameOpen}
            />
            <Github
              t={t}
              signupLoading={loading}
              redirectUrl={redirectUrl}
              setRenameOpen={setRenameOpen}
              setSignupOpen={setSignupOpen}
            />
          </Group>
          <Space h="xs" />
          <Text size="xs">{t.iAgreeTerms}</Text>
          <Group justify="space-between">
            <Text size="sm">
              {t.alreadyHaveAccount + " "}
              <Anchor
                onClick={() => {
                  setSignupOpen(false);
                router.push("/login?r=" + redirectUrl);
                }}
              >
                {t.logIn}
              </Anchor>
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
    </>
  );
}

export function Google({
  t,
  signupLoading,
  redirectUrl,
  setSignupOpen,
  setRenameOpen,
}: {
  t: AuthLanguage;
  signupLoading: boolean;
  redirectUrl: string;
  setSignupOpen: Dispatch<SetStateAction<boolean>>;
  setRenameOpen: Dispatch<SetStateAction<boolean>>;
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
          if (hasCookie("first_login")) {
            setSignupOpen(false);
            setTimeout(() => {
              setRenameOpen(true);
            }, 400);
          } else {
            window.location.href = redirectUrl;
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
  redirectUrl,
  setSignupOpen,
  setRenameOpen,
}: {
  t: AuthLanguage;
  signupLoading: boolean;
  redirectUrl: string;
  setSignupOpen: Dispatch<SetStateAction<boolean>>;
  setRenameOpen: Dispatch<SetStateAction<boolean>>;
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
          if (hasCookie("first_login")) {
            setSignupOpen(false);
            setTimeout(() => {
              setRenameOpen(true);
            }, 400);
          } else {
            window.location.href = redirectUrl;
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
  redirectUrl,
}: {
  t: AuthLanguage;
  redirectUrl: string;
}) {
  const router = useRouter();
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
      const res = await rename(username);
      if (res.status == 200) {
        notifications.show({
          color: "green",
          title: t.successfulOauthSignup,
          message: t.successfulOauthsignupMessage,
          icon: <HiCheckCircle size={30} />,
          classNames: classes,
          autoClose: 5000,
        });
        window.location.href = redirectUrl;
      } else {
        setUsernameError(t.invalidUsername);
      }
      setLoading(false);
    }
  };

  return (
    <>
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
    </>
  );
}
