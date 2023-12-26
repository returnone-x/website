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
import { QuestionUpvote } from "@/api/question/questionUpVote";
import { QuestionDownVote } from "@/api/question/questionDownVote";
import { useState } from "react";
import { DeleteQuesitonVote } from "@/api/question/deleteQuestionVote";
import { QuestionLanguage } from "./detill";

export function DetillCompnent({
  questionDetill,
  t,
}: {
  questionDetill: AxiosResponse<any, any>;
  t: QuestionLanguage;
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
                <Badge key={index} size="xs">
                  {badgeName}
                </Badge>
              ))}
            </Flex>
            <Flex
              gap="xs"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Text fw={700} size="xs" c="#868e96">
                {t.views}: 100k
              </Text>
              <Text fw={700} size="xs" c="#868e96">
                {t.postAt}: 10k
              </Text>
              <Text fw={700} size="xs" c="#868e96">
                {t.updateAt}: 10k
              </Text>
            </Flex>
            <Divider />
          </Stack>
          <TiptapVewContent content={questionDetill.data.content} />
          <Group justify="space-between">
            <Toolbar questionDetill={questionDetill} t={t}/>
          </Group>
          <Comment questionDetill={questionDetill} t={t}/>
          <Divider />
          <Space />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}

function Comment({
  questionDetill,
  t,
}: {
  questionDetill: AxiosResponse<any, any>;
  t: QuestionLanguage;
}) {
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
            align="center"
            direction="row"
            wrap="nowrap"
          >
            <Text size="md" fw={700} truncate="end">
              Night Cat
            </Text>
            <Text size="xs" c="#868e96">
              2024/1/1 19:50 ({t.edited})
            </Text>
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
              {t.loadMore}
            </Button>
          </Center>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}

function Toolbar({
  questionDetill,
  t,
}: {
  questionDetill: AxiosResponse<any, any>;
  t: QuestionLanguage;
}) {
  const [voteStatus, setVoteStatus] = useState(questionDetill.data.user_vote);
  const [newVote, setNewVote] = useState(0);

  const upVoteFunction = async () => {
    if (voteStatus === 1) {
      return noVoteFunction();
    }
    setVoteStatus(1);
    if (questionDetill.data.user_vote === 1) {
      setNewVote(0);
    } else if (questionDetill.data.user_vote === 2) {
      setNewVote(2);
    } else {
      setNewVote(1);
    }
    await QuestionUpvote(questionDetill.data.id);
  };

  const downVoteFunction = async () => {
    if (voteStatus === 2) {
      return noVoteFunction();
    }
    setVoteStatus(2);
    if (questionDetill.data.user_vote === 2) {
      setNewVote(0);
    } else if (questionDetill.data.user_vote === 1) {
      setNewVote(-2);
    } else {
      setNewVote(-1);
    }
    await QuestionDownVote(questionDetill.data.id);
  };

  const noVoteFunction = async () => {
    if (voteStatus === 0) {
      return;
    }
    setVoteStatus(0);
    if (questionDetill.data.user_vote === 1) {
      setNewVote(-1);
    } else if (questionDetill.data.user_vote === 2) {
      setNewVote(1);
    } else {
      setNewVote(0);
    }
    await DeleteQuesitonVote(questionDetill.data.id);
  };

  return (
    <Group gap="10px">
      <ActionIcon
        onClick={() => upVoteFunction()}
        variant="transparent"
        aria-label="Settings"
        className={voteStatus === 1 ? classes.upIcon : classes.normalIcon}
        size="lg"
      >
        <TbArrowBigUp size={30} />
      </ActionIcon>
      <Text
        fw={700}
        className={
          voteStatus === 0
            ? classes.normalIcon
            : voteStatus === 1
            ? classes.upIcon
            : classes.downIcon
        }
      >
        {questionDetill.data.vote_count + newVote <= 0
          ? voteStatus === 0
            ? t.vote
            : t.voted
          : questionDetill.data.vote_count + newVote}
      </Text>
      <ActionIcon
        onClick={() => downVoteFunction()}
        variant="transparent"
        aria-label="Settings"
        className={voteStatus === 2 ? classes.downIcon : classes.normalIcon}
        size="lg"
      >
        <TbArrowBigDown size={30} />
      </ActionIcon>
      <Group gap="0px">
        <ActionIcon
          variant="transparent"
          aria-label="Settings"
          className={classes.normalIcon}
          size="lg"
        >
          <HiOutlineAnnotation size={30} />
        </ActionIcon>
        <Text fw={700}>7</Text>
      </Group>
      <ActionIcon
        variant="transparent"
        aria-label="Settings"
        className={classes.normalIcon}
        size="lg"
      >
        <FaRegShareSquare size={30} />
      </ActionIcon>
      <ActionIcon
        variant="transparent"
        aria-label="Settings"
        className={classes.normalIcon}
        size="lg"
      >
        <MdOutlineLibraryAdd size={30} />
      </ActionIcon>
      <Menu width={200} shadow="md" radius="lg">
        <Menu.Target>
          <ActionIcon
            variant="transparent"
            aria-label="Settings"
            className={classes.normalIcon}
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
