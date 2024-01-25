"use client";
import {
  Avatar,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import {FaHotjar, FaBookmark } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { HiHome, HiQuestionMarkCircle } from "react-icons/hi";
import { MdQuestionAnswer } from "react-icons/md";
import clasess from "./List.module.css";
import { ListLanguage } from "./list";

export function SideBar({t}: {t:ListLanguage}) {
    return (
        <Stack className={clasess.sidebar} visibleFrom="sm">
            <Group gap="xs">
              <Avatar
                variant="filled"
                radius="md"
                src="https://lh3.googleusercontent.com/a/ACg8ocLBS5RirRDp1AvxnMJhNOseAbSyNwxO7tVGswmswWlf3Lw=s96-c"
                size="sm"
              />
              <Text size="lg" fw={700}>
                NightCat
              </Text>
            </Group>
            <Group gap="xs">
              <HiHome size={20} />
              <Text size="lg" fw={700}>
                {t.home}
              </Text>
            </Group>
            <Group gap="xs">
              <FaHotjar size={20} />
              <Text size="lg" fw={700}>
                {t.hotQuestion}
              </Text>
            </Group>
            <Group gap="xs">
              <IoIosPricetags size={20} />
              <Text size="lg" fw={700}>
                {t.tags}
              </Text>
            </Group>
            <Group gap="xs">
              <FaBookmark size={20} />
              <Text size="lg" fw={700}>
                {t.saved}
              </Text>
            </Group>
            <Group gap="xs">
              <HiQuestionMarkCircle size={20} />
              <Text size="lg" fw={700}>
                {t.yourQuestions}
              </Text>
            </Group>
            <Group gap="xs">
              <MdQuestionAnswer size={20} />
              <Text size="lg" fw={700}>
                {t.yourAnswer}
              </Text>
            </Group>
            <Divider label={t.history} labelPosition="left" />
          </Stack>
    )
}