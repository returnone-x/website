import {
  Container,
  Group,
  Text,
  Button,
  TextInput,
  Space,
  ActionIcon,
  Avatar,
} from "@mantine/core";
import classes from "./Header.module.css";
import { HiOutlineSearch, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { SetTheme } from "./mode";
import { SignupLogin } from "./auth";
import { GetAvatarFromServerSide } from "@/api/user/getAvatar";
import { cookies } from "next/headers";
import { ChangeLanguage } from "./language";

export type HeaderLanguage = {
  signUp: string;
  logIn: string;
  search: string;
  blog: string;
  aboutUs: string;
  ask: string;
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
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
  pleaseUpdateYourName: string;
  successfulOauthSignup: string;
  successfulOauthsignupMessage: string;
  successfulLogin: string;
  successfulLoginMessage: string;
  invalidEmailOrPassword: string;
};

export async function HeaderComponent({
  t,
  locale,
}: {
  t: HeaderLanguage;
  locale: string;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const avatar = await getAvatar(
    accessToken ? accessToken.name + "=" + accessToken.value : ""
  );

  const userAvatarOrLogin =
    avatar != "" ? (
      <Avatar variant="filled" radius="md" src={avatar} />
    ) : (
      <SignupLogin t={t} />
    );

  return (
    <header className={classes.header}>
      <Container size="1440px" className={classes.container}>
        <Group justify="space-between" gap="xl">
          <Group justify="space-between" gap="sm">
            <Text fw={700} size="30px" className={classes.centerHorizontal}>
              returnone
            </Text>
            <Space w="xl" className={classes.flexone} visibleFrom="md" />
            <Text
              fw={700}
              size="md"
              className={classes.centerHorizontal}
              visibleFrom="sm"
            >
              {t.blog}
            </Text>{" "}
            <Text
              fw={700}
              size="md"
              className={classes.centerHorizontal}
              visibleFrom="sm"
            >
              {t.aboutUs}
            </Text>
          </Group>

          <TextInput
            placeholder={t.search}
            className={classes.textInput}
            radius="lg"
            rightSection={<HiOutlineSearch />}
            visibleFrom="sm"
          />
          <Group justify="space-between" gap="sm">
            <Button
              leftSection={<HiOutlineQuestionMarkCircle size={20} />}
              radius="md"
              variant="gradient"
              gradient={{ from: "#FFC37D", to: "#FF6B01", deg: 154 }}
              visibleFrom="md"
            >
              {t.ask}
            </Button>
            <Space w="xl" className={classes.flexone} visibleFrom="md" />
            {userAvatarOrLogin}
            <Space w="xl" className={classes.flexone} visibleFrom="md" />
            <ChangeLanguage />
            <ActionIcon
              variant="subtle"
              aria-label="github"
              visibleFrom="sm"
              className={classes.icon}
            >
              <FaGithub size={25} className={classes.icon}></FaGithub>
            </ActionIcon>
            <SetTheme />
          </Group>
        </Group>
      </Container>
    </header>
  );
}

async function getAvatar(accessToken: string) {
  const res = await GetAvatarFromServerSide(accessToken);

  if (res.status != 200) {
    return "";
  }

  return res.data.data;
}
