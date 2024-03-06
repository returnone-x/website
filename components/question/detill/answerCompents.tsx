"use client";

import "@mantine/tiptap/styles.css";
import {
  Divider,
  Stack,
  Group,
  Text,
  ActionIcon,
  Menu,
  Avatar,
  Box,
  Title,
  Flex,
} from "@mantine/core";
import { AxiosResponse } from "axios";
import { TiptapVewContent } from "@/components/editor/editorViewContent";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import classes from "./Detill.module.css";
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useState } from "react";
import { QuestionLanguage } from "./detill";
import { QuestionAnswerUpVote } from "@/api/question/answer/questionAnsweUpVote";
import { QuestionAnswerDownVote } from "@/api/question/answer/questionAnsweDownVote";
import { DeleteQuestionAnswerVote } from "@/api/question/answer/deleteQuestionVote";
import moment from "moment";
import { TimeDisplay, websiteUrl } from "@/config/config";
import { getCookie } from "cookies-next";
import { modals } from "@mantine/modals";
import { TiWarning } from "react-icons/ti";

import {
  HiOutlineAnnotation,
  HiDotsHorizontal,
  HiOutlineFlag,
  HiOutlineTrash,
  HiCheckCircle,
} from "react-icons/hi";
import { DeleteQuestionAnswer } from "@/api/question/answer/deleteQuestionAnswer";
import { notifications } from "@mantine/notifications";
import { theme } from "@/themes/theme";
import { useRouter } from "next/navigation";

export type answersType = {
  id: string;
  question_id: string;
  user_id: string;
  content: string;
  avatar: string;
  user_name: string;
  up_vote: number;
  down_vote: number;
  user_vote: number;
  create_at: string;
  update_at: string;
};

export function ShowAnswer({
  questionDetill,
  t,
}: {
  questionDetill: AxiosResponse<any, any>;
  t: QuestionLanguage;
}) {
  const dt = new Date();
  let diffTZ = -dt.getTimezoneOffset();

  return (
    <>
      {questionDetill.data.answers?.map(
        (answer: answersType, index: number) => (
          <Stack key={answer.id}>
            <TiptapVewContent content={answer.content} />
            <Group wrap="nowrap" justify="space-between" visibleFrom="xs">
              <AnswerToolbar answerData={answer} t={t} />
              <Group justify="flex-end" wrap="nowrap">
                <Avatar variant="filled" radius="sm" src={answer.avatar} />
                <Stack gap="0px">
                  <Text size="xs" className={classes.grayIcon}>
                    {t.askAt}:{" "}
                    {moment(answer.create_at)
                      .utcOffset(diffTZ)
                      .format(TimeDisplay)}
                  </Text>
                  <Text size="md" truncate="end">
                    {answer.user_name}
                  </Text>
                </Stack>
              </Group>
            </Group>

            <Stack hiddenFrom="xs">
              <Group justify="flex-start">
                <Avatar variant="filled" radius="sm" src={answer.avatar} />
                <Stack gap="0px">
                  <Text size="xs" className={classes.grayIcon}>
                    {t.askAt}:{" "}
                    {moment(answer.create_at)
                      .utcOffset(diffTZ)
                      .format(TimeDisplay)}
                  </Text>
                  <Text size="md" truncate="end">
                    {answer.user_name}
                  </Text>
                </Stack>
              </Group>
              <AnswerToolbar answerData={answer} t={t} />
            </Stack>

            <Divider />
          </Stack>
        )
      )}
    </>
  );
}

function AnswerToolbar({
  answerData,
  t,
}: {
  answerData: answersType;
  t: QuestionLanguage;
}) {
  const router = useRouter()
  const userId = getCookie("user_id");
  const locale = getCookie("NEXT_LOCALE") || "en";
  const questionVoteCount = answerData.up_vote - answerData.down_vote;

  const [voteStatus, setVoteStatus] = useState(answerData.user_vote);
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
          <Title order={3}>{t.warnDeleteAnswer}</Title>
        </Flex>
      ),
      centered: true,
      children: <Text size="md">{t.warnDeleteAnswerDetil}</Text>,
      labels: { confirm: t.confirm, cancel: t.cancel },
      radius: "lg",
      confirmProps: { color: "red", radius: "lg" },
      cancelProps: { radius: "lg" },
      onConfirm: () => DeleteAnswerFunction(),
    });

  const DeleteAnswerFunction = async () => {
    const res = await DeleteQuestionAnswer(answerData.id);
    if (res.status === 204) {
      notifications.show({
        radius: "lg",
        title: t.successfulDeleteAnswer,
        message: t.successfulDeleteAnswerDetil,
        icon: <HiCheckCircle size={30} />,
        color: "green",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const DeleteAnswerCompents = () => {
    if (userId === answerData.user_id) {
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
  };

  const upVoteFunction = async () => {
    if (!userId || userId == null){
      return router.push(`/${locale}/login?r=${window.location.href ? window.location.href : websiteUrl}`)
    }
    if (voteStatus === 1) {
      return noVoteFunction();
    }
    setVoteStatus(1);
    if (answerData.user_vote === 1) {
      setNewVote(0);
    } else if (answerData.user_vote === 2) {
      setNewVote(2);
    } else {
      setNewVote(1);
    }
    await QuestionAnswerUpVote(answerData.id);
  };

  const downVoteFunction = async () => {
    if (!userId || userId == null){
      return router.push(`/${locale}/login?r=${window.location.href ? window.location.href : websiteUrl}`)
    }
    if (voteStatus === 2) {
      return noVoteFunction();
    }
    setVoteStatus(2);
    if (answerData.user_vote === 2) {
      setNewVote(0);
    } else if (answerData.user_vote === 1) {
      setNewVote(-2);
    } else {
      setNewVote(-1);
    }
    await QuestionAnswerDownVote(answerData.id);
  };

  const noVoteFunction = async () => {
    if (voteStatus === 0) {
      return;
    }
    setVoteStatus(0);
    if (answerData.user_vote === 1) {
      setNewVote(-1);
    } else if (answerData.user_vote === 2) {
      setNewVote(1);
    } else {
      setNewVote(0);
    }
    await DeleteQuestionAnswerVote(answerData.id);
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
        {questionVoteCount + newVote <= 0
          ? voteStatus === 0
            ? t.vote
            : t.voted
          : questionVoteCount + newVote}
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
          {DeleteAnswerCompents()}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
