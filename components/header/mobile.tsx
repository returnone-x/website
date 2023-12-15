"use client";

import {
  Burger,
  Drawer,
  Text,
  Center,
  Group,
  ActionIcon,
  Container,
  Divider,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderLanguage } from "./Header";
import classes from "./Header.module.css";
import { ChangeLanguage } from "./language";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SetTheme } from "./mode";
import { FcGoogle } from "react-icons/fc";
import { SignupLogin } from "./auth";

export function HamburgerMenu({ t }: { t: HeaderLanguage }) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <Burger
        opened={opened}
        onClick={toggle}
        aria-label="Toggle navigation"
        hiddenFrom="md"
      />
      <Drawer
        size="100%"
        position="right"
        opened={opened}
        onClose={toggle}
        hiddenFrom="md"
        title={
          <Text
            fw={700}
            size="30px"
            className={classes.centerHorizontal}
          >
            RETURNONE
          </Text>
        }
      >
        <Center>
          <Group justify="space-between" gap="xl">
            <ChangeLanguage visibleFrom="" />
            <Divider orientation="vertical" />
            <ActionIcon
              variant="subtle"
              aria-label="github"
              className={classes.icon}
            >
              <Link href="https://github.com/returnone-x" target="_blank">
                <FaGithub size={25} className={classes.icon} />
              </Link>
            </ActionIcon>
            <Divider orientation="vertical" />
            <SetTheme visibleFrom="" />
          </Group>
        </Center>
        <Divider my="md" />
        <Center>
          <Text fw={700} size="md" className={classes.centerHorizontal}>
            {t.blog}
          </Text>
        </Center>
        <Divider my="md" />
        <Center>
          <Text fw={700} size="md" className={classes.centerHorizontal}>
            {t.aboutUs}
          </Text>
        </Center>
        <Divider my="md" />
        <SignupLogin t={t} visibleFrom="" />
      </Drawer>
    </>
  );
}
