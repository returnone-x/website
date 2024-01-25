"use client";
import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { FaCheck, FaHotjar, FaBookmark } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { HiHome, HiQuestionMarkCircle } from "react-icons/hi";
import { MdQuestionAnswer } from "react-icons/md";
const { convert } = require("html-to-text");
import { Pagination } from "@mantine/core";
import clasess from "./List.module.css";
import { ListLanguage } from "./list";

export function RecommonQuestion({t}: {t:ListLanguage}) {
  return (
    <Stack className={clasess.sidebar} visibleFrom="sm">
      <Divider label={t.recommend} labelPosition="left" />
      
      <Card shadow="sm" padding="xs" radius="md" withBorder>
        <Stack gap="0px">
          <Group gap="sm" wrap="nowrap">
            <Anchor underline="hover" onClick={() => {}} c="#fd7e14">
              <Text size="md">
                React-hook-form - watch causing an infinite loop
              </Text>
            </Anchor>
          </Group>
          <Space h="xs"></Space>
          <Group gap="sm" justify="space-between">
            <Group gap="5px">
              <Avatar
                variant="filled"
                radius="md"
                src="https://lh3.googleusercontent.com/a/ACg8ocLBS5RirRDp1AvxnMJhNOseAbSyNwxO7tVGswmswWlf3Lw=s96-c"
                size="xs"
              />
              <Text size="xs" c="gray">
                Asked at 10 years ago
              </Text>
            </Group>
          </Group>
        </Stack>
      </Card>
      
    </Stack>
  );
}
