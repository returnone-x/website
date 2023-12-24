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
  Avatar,
  Flex,
  Button,
  Center,
  Badge,
} from "@mantine/core";
import { AxiosResponse } from "axios";
import "@mantine/tiptap/styles.css";
import { TiptapVewContent } from "@/components/editor/editorViewContent";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import classes from "./Detill.module.css";
import {
  HiOutlineAnnotation,
  HiCloudDownload,
  HiDotsHorizontal,
} from "react-icons/hi";
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";

export function DetillCompnent({
  questionDetill,
}: {
  questionDetill: AxiosResponse<any, any>;
}) {
  function fullBadges() {
    const badges = [];
    for (let i = 0; i < questionDetill.data.tags_name.length; i++) {
      const badge_verison =
        questionDetill.data.tags_version[i] === ""
          ? ""
          : `:${questionDetill.data.tags_version[i]}`;
      const badge_name = questionDetill.data.tags_name[i] + badge_verison;
      badges.push(badge_name);
    }
    return badges;
  }
  return (
    <Grid>
      <Grid.Col span={{ base: 0, md: 4 }}>1</Grid.Col>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Stack>
          <Stack gap="xs">
            <Title order={1}>{questionDetill.data.title}</Title>
            <Flex
              gap="xs"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              {fullBadges().map((badgeName, index) => (
                <Badge key={index} size="sm">
                  {badgeName}
                </Badge>
              ))}
            </Flex>
            <Divider />
          </Stack>
          <TiptapVewContent content={questionDetill.data.content} />
          <Group justify="space-between">
            <Toolbar />
          </Group>
          <Comment />
          <Divider />
          <Space />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}

function Comment() {
  function SubComment() {
    return (
      <Flex
        gap="xs"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="nowrap"
      >
        <Avatar
          src="https://i1.sndcdn.com/artworks-DMKEsjVymB5A2teD-yr6bng-t240x240.jpg"
          alt="it's me"
        />
        <Stack gap="0px">
          <Flex
            gap="xs"
            justify="flex-start"
            align="flex-end"
            direction="row"
            wrap="nowrap"
          >
            <Text size="md" fw={700} truncate="end">
              Night Cat
            </Text>
            <Text size="xs">2024/1/1 19:50 (edited)</Text>
          </Flex>
          <Text size="md">
            i think you are really so suck bla bla bla bla bla bla bla bla bla
            bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
            bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla blabla
            bla bla bla bla bla bla bla bla bla bla bla bla bla
          </Text>
        </Stack>
      </Flex>
    );
  }

  return (
    <Grid>
      <Grid.Col span={{ base: 1 }} />
      <Grid.Col span={{ base: 11 }}>
        <Stack gap="xs">
          <SubComment />
          <SubComment />
          <Center>
            <Button variant="transparent" leftSection={<HiCloudDownload />}>
              Load more
            </Button>
          </Center>
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
      <Group gap="0px">
        <ActionIcon
          variant="transparent"
          aria-label="Settings"
          className={classes.icon}
          size="lg"
        >
          <HiOutlineAnnotation size={30} />
        </ActionIcon>
        <Text fw={700}>7</Text>
      </Group>
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
