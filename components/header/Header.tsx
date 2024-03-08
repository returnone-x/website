import {
  Container,
  Group,
  Text,
  TextInput,
  Space,
  ActionIcon,
  Divider,
} from "@mantine/core";
import classes from "./Header.module.css";
import { HiOutlineSearch, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { SetTheme } from "./mode";
import { SignupLogin } from "./auth";
import { GetAvatarFromServerSide } from "@/api/user/getAvatar";
import { cookies } from "next/headers";
import { ChangeLanguage } from "./language";
import { UserAvatarDropdown } from "./avatar";
import Link from "next/link";
import { HamburgerMenu } from "./mobile";
import { FcGoogle } from "react-icons/fc";

export type HeaderLanguage = {
  signUp: string;
  logIn: string;
  search: string;
  blog: string;
  aboutUs: string;
  ask: string;
  logout: string;
  profile: string;
  setting: string;
};

export async function HeaderComponent({
  t,
}: {
  t: HeaderLanguage;
}) {
  const cookieStore = cookies();
  const user_id = cookieStore.get("user_id") || null
  const avatar = user_id ? await getAvatar(user_id.value) : "";
  const userAvatar =
    avatar != "" ? <UserAvatarDropdown t={t} avatar={avatar} /> : <></>;
  const SignLogin =
    avatar === "" ? <SignupLogin t={t} visibleFrom="xs" /> : <></>;

  return (
    <header className={classes.header}>
      <Container size="1440px" className={classes.container}>
        <Group justify="space-between" gap="xl">
          <Group justify="space-between" gap="sm">
            <Text
              fw={700}
              size="30px"
              className={classes.centerHorizontal}
              visibleFrom="xs"
            >
              RETURNONE
            </Text>
            <Text
              fw={700}
              size="30px"
              className={classes.centerHorizontal}
              hiddenFrom="xs"
            >
              <FcGoogle size={30} />
            </Text>
            <Text
              fw={700}
              size="md"
              className={classes.centerHorizontal}
              visibleFrom="md"
            >
              {t.blog}
            </Text>{" "}
            <Text
              fw={700}
              size="md"
              className={classes.centerHorizontal}
              visibleFrom="md"
            >
              {t.aboutUs}
            </Text>
          </Group>

          <TextInput
            placeholder={t.search}
            className={classes.textInput}
            radius="lg"
            rightSection={<HiOutlineSearch />}
            visibleFrom="md"
          />
          <Group justify="space-between" gap="md">
            <Space w="xl" className={classes.flexone} visibleFrom="md" />
            {SignLogin}
            <Space w="xl" className={classes.flexone} visibleFrom="md" />
            {userAvatar}
            <ActionIcon
              className={classes.icon}
              variant="transparent"
              color="gray"
              aria-label="Settings"
              hiddenFrom="md"
            >
              <HiOutlineSearch size={25} className={classes.icon} />
            </ActionIcon>
            <Space w="xs" className={classes.flexone} visibleFrom="md" />
            <ChangeLanguage visibleFrom="sm" />
            <ActionIcon
              variant="subtle"
              aria-label="github"
              className={classes.icon}
              visibleFrom="sm"
            >
              <Link href="https://github.com/returnone-x" target="_blank">
                <FaGithub size={25} className={classes.icon} />
              </Link>
            </ActionIcon>
            <SetTheme visibleFrom="sm" />
            <HamburgerMenu t={t} />
          </Group>
        </Group>
      </Container>
    </header>
  );
}

async function getAvatar(user_id: any) {
  const res = await GetAvatarFromServerSide(user_id);

  if (res.status != 200) {
    return "";
  }

  return res.data.data;
}
