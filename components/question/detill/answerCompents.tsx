"use client";

import { Divider, Stack, Group, Text, ActionIcon, Menu } from "@mantine/core";
import { AxiosResponse } from "axios";
import "@mantine/tiptap/styles.css";
import { TiptapVewContent } from "@/components/editor/editorViewContent";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import classes from "./Detill.module.css";
import { HiOutlineAnnotation, HiDotsHorizontal } from "react-icons/hi";
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useState } from "react";
import { QuestionLanguage } from "./detill";
import { QuestionAnswerUpVote } from "@/api/question/answer/questionAnsweUpVote";
import { QuestionAnswerDownVote } from "@/api/question/answer/questionAnsweDownVote";
import { DeleteQuestionAnserVote } from "@/api/question/answer/deleteQuestionVote";

export type answersType = {
  id: string;
  question_id: string;
  user_id: string;
  content: string;
  avatar: string;
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
  return (
    <>
      {questionDetill.data.answers?.map(
        (answer: answersType, index: number) => (
          <Stack key={answer.id}>
            <TiptapVewContent content={answer.content} />
            <Group justify="space-between">
              <AnswerToolbar answerData={answer} t={t} />
            </Group>
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
  const questionVoteCount = answerData.up_vote - answerData.down_vote;

  const [voteStatus, setVoteStatus] = useState(answerData.user_vote);
  const [newVote, setNewVote] = useState(0);

  const upVoteFunction = async () => {
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
    await QuestionAnswerUpVote(answerData.id)
  };

  const downVoteFunction = async () => {
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
    await QuestionAnswerDownVote(answerData.id)
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
    await DeleteQuestionAnserVote(answerData.id);
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
