import {
  Container,
  Group,
  Text,
  Button,
  TextInput,
  Space,
  ActionIcon,
  Anchor,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import classes from "./Header.module.css";
import { HiOutlineSearch, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { SetTheme } from "./mode";

export function HeaderComponent() {
  const t = useTranslations("Header");

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
              {t("blog")}
            </Text>{" "}
            <Text
              fw={700}
              size="md"
              className={classes.centerHorizontal}
              visibleFrom="sm"
            >
              {t("about_us")}
            </Text>
          </Group>

          <TextInput
            placeholder={t("search")}
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
              {t("ask")}
            </Button>
            <Space w="xl" className={classes.flexone} visibleFrom="md" />
            <Button variant="outline" radius="md" className={classes.signup}>
              {t("login")}
            </Button>
            <Button variant="filled" radius="md" color="">
              {t("signup")}
            </Button>
            <Space w="xl" className={classes.flexone} visibleFrom="md" />
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
