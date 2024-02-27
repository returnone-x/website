"use client";

import {
  Grid,
  Stack,
  Group,
  Text,
  ActionIcon,
  Menu,
  Avatar,
  Flex,
  Button,
  Space,
  LoadingOverlay,
  Box,
  Title,
} from "@mantine/core";
import { AxiosResponse } from "axios";
import "@mantine/tiptap/styles.css";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import classes from "./Detill.module.css";
import { HiOutlineAnnotation, HiDotsHorizontal, HiCheckCircle } from "react-icons/hi";
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { QuestionUpvote } from "@/api/question/questionUpVote";
import { QuestionDownVote } from "@/api/question/questionDownVote";
import { useState } from "react";
import { DeleteQuesitonVote } from "@/api/question/deleteQuestionVote";
import { QuestionLanguage } from "./detill";
import { SimpleEditor } from "@/components/editor/simpleEditor";
import { TiptapEditor } from "@/components/editor/editor";
import { NewQuestionComment } from "@/api/question/comment/newComment";
import { BsFillSendFill } from "react-icons/bs";
import { SimpleViewContent } from "@/components/editor/simpleViewContent";
import { NewQuestionAnswer } from "@/api/question/answer/newQuestionAnswer";
import { HiOutlineTrash, HiOutlineFlag } from "react-icons/hi";
import { getCookie } from 'cookies-next';
import { modals } from "@mantine/modals";
import { TiWarning } from "react-icons/ti";
import { theme } from "@/themes/theme";
import { notifications } from "@mantine/notifications";
import { DeleteQuesiton } from "@/api/question/deleteQuestion";
import { redirect, useRouter } from "next/navigation";
import { websiteUrl } from "@/config/config";

export function Anwser({
  questionDetill,
  t,
}: {
  questionDetill: AxiosResponse<any, any>;
  t: QuestionLanguage;
}) {
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

  const newAnswerFunction = async () => {
    setLoading(true);
    const res = await NewQuestionAnswer(questionDetill.data.id, editorContent);
    setLoading(false);
  };

  return (
    <Stack gap="xs">
      <Text
        size="50px"
        fw={900}
        variant="gradient"
        gradient={{ from: "orange", to: "rgba(221, 255, 0, 1)", deg: 90 }}
        className={classes.graytext}
      >
        {t.answerThisQuestion}
      </Text>
      <Space h={"md"} />
      <Box pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <TiptapEditor changeContent={setEditorContent} />
      </Box>
      <Button
        loading={loading}
        variant="filled"
        rightSection={<BsFillSendFill />}
        onClick={newAnswerFunction}
      >
        {t.answer}
      </Button>
    </Stack>
  );
}

export function Comment({
  questionDetill,
  t,
}: {
  questionDetill: AxiosResponse<any, any>;
  t: QuestionLanguage;
}) {
  const [editorContent, setEditorContent] = useState("");

  const newCommentFunction = async () => {
    const res = await NewQuestionComment(
      questionDetill.data.id,
      editorContent,
      ""
    );
  };

  return (
    <Grid>
      <Grid.Col span={{ base: 1 }} />
      <Grid.Col span={{ base: 11 }}>
        <Stack gap="xs">
          <SubComment t={t} />
          <SubComment t={t} />
          <SimpleEditor changeContent={setEditorContent} />
          <Button
            variant="filled"
            onClick={newCommentFunction}
            rightSection={<BsFillSendFill />}
          >
            {t.comment}
          </Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}

export function SubComment({ t }: { t: QuestionLanguage }) {
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
        <SimpleViewContent
          content={`<p>fuck you</p>`}
        />
      </Stack>
    </Flex>
  );
}

export function QuestionToolbar({
  questionDetill,
  t,
  locale,
}: {
  questionDetill: AxiosResponse<any, any>;
  t: QuestionLanguage;
  locale: string;
}) {
  const router = useRouter()
  const userId = getCookie("user_id");

  const [voteStatus, setVoteStatus] = useState(questionDetill.data.user_vote);
  const [newVote, setNewVote] = useState(0);

  const openModal = () =>
  modals.openConfirmModal({
    title: (
      <Flex
        gap="xs"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="nowrap"
      >
        <TiWarning size={25} color={theme.other?.warn} />
        <Title order={3}>{t.warnDeleteQuestion}</Title>
      </Flex>
    ),
    centered: true,
    children: <Text size="md">{t.warnDeleteQuestionDetil}</Text>,
    labels: { confirm: t.confirm, cancel: t.cancel },
    radius: "lg",
    confirmProps: { color: "red", radius: "lg" },
    cancelProps: { radius: "lg" },
    onConfirm: () => DeleteQuestionFunction(),
  });

const DeleteQuestionFunction = async () => {

  const res = await DeleteQuesiton(questionDetill.data.id);
  if (res.status === 204) {
    notifications.show({
      radius: "lg",
      title: t.successfulDeleteQuestion,
      message: t.successfulDeleteQuestionDetil,
      icon: <HiCheckCircle size={30} />,
      color: "green",
    });
    setTimeout(() => {
      router.push(`/${locale}/question`)
    }, 1000);
  }
};

  const DeleteQuestionCompents = () => {
    if (userId === questionDetill.data.questioner_id) {
      return (
        <Menu.Item
          component="a"
          color="red"
          leftSection={<HiOutlineTrash size={20} />}
          onClick={openModal}
        >
          {t.delete}
        </Menu.Item>
      );
    } else {
      return <></>;
    }
  }

  const upVoteFunction = async () => {
    if (!userId || userId == null){
      return router.push(`/${locale}` + `/login?r=${window.location.href ? window.location.href : websiteUrl}`)
    }
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
    if (!userId || userId == null){
      return router.push(`/${locale}` + `/login?r=${window.location.href ? window.location.href : websiteUrl}`)
    }
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
      <Menu width={110} shadow="md" radius="lg">
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
        <Menu.Item
            component="a"
            href="https://mantine.dev"
            target="_blank"
            leftSection={<HiOutlineFlag size={20} />}
          >
            Report
          </Menu.Item>
          {DeleteQuestionCompents()}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
