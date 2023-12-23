"use client";

import {
  Grid,
  Title,
  Divider,
  Stack,
  Space,
  Group,
  Text,
  ActionIcon,
  Tooltip,
  Menu,
} from "@mantine/core";
import { AxiosResponse } from "axios";
import "@mantine/tiptap/styles.css";
import { TiptapVewContent } from "@/components/editor/editorViewContent";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import classes from "./Detill.module.css";
import {
  HiOutlineAnnotation,
  HiOutlineBookmark,
  HiDotsHorizontal,
} from "react-icons/hi";
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";

export function DetillCompnent({
  questionDetill,
}: {
  questionDetill: AxiosResponse<any, any>;
}) {
  return (
    <Grid>
      <Grid.Col span={{ base: 0, md: 4 }}>1</Grid.Col>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Stack>
          <Title order={1}>{questionDetill.data.title}</Title>
          <Divider />
          <TiptapVewContent content={questionDetill.data.content} />
          <Group justify="space-between">
            <Toolbar />
          </Group>
          <Space />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}

function Toolbar() {
  return (
    <Group gap="10px">
      <ActionIcon
        variant="transparent"
        aria-label="Settings"
        className={classes.icon}
        size="lg"
      >
        <TbArrowBigUp size={30} />
      </ActionIcon>
      <Text fw={700}>10</Text>
      <ActionIcon
        variant="transparent"
        aria-label="Settings"
        className={classes.icon}
        size="lg"
      >
        <TbArrowBigDown size={30} />
      </ActionIcon>
      <ActionIcon
        variant="transparent"
        aria-label="Settings"
        className={classes.icon}
        size="lg"
      >
        <HiOutlineAnnotation size={30} />
      </ActionIcon>
      <ActionIcon
        variant="transparent"
        aria-label="Settings"
        className={classes.icon}
        size="lg"
      >
        <FaRegShareSquare size={30} />
      </ActionIcon>
      <ActionIcon
        variant="transparent"
        aria-label="Settings"
        className={classes.icon}
        size="lg"
      >
        <MdOutlineLibraryAdd size={30} />
      </ActionIcon>
      <Menu width={200} shadow="md" radius="lg">
        <Menu.Target>
          <ActionIcon
            variant="transparent"
            aria-label="Settings"
            className={classes.icon}
            size="lg"
          >
            <HiDotsHorizontal size={30} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item component="a" href="https://mantine.dev" target="_blank">
            External link
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item component="a" href="https://mantine.dev" target="_blank">
            External link
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
