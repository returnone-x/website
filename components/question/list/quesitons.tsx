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
  LoadingOverlay,
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
import { SideBar } from "./sidebar";
import { RecommonQuestion } from "./recommon";
import { ListLanguage, Questions } from "./list";
import moment from "moment";
import { SimpleTimeDisplay, TimeDisplay, websiteUrl } from "@/config/config";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export function QuestionListComponents({
  t,
  questionsArray,
  questionsNumber,
  page,
  tag,
}: {
  t: ListLanguage;
  questionsArray: Questions[];
  questionsNumber: number;
  page: number;
  tag: string;
}) {
  const router = useRouter();
  const [activePage, setPage] = useState(page == 0 ? 1 : page);
  const dt = new Date();
  let diffTZ = -dt.getTimezoneOffset();
  const locale = getCookie("NEXT_LOCALE") || "en";

  let query = "";
  if (page != undefined && tag != "") {
    query = `?page=${activePage}&tag=${tag}`;
  } else if (page != undefined) {
    query = `?page=${activePage}`;
  } else if (tag != undefined) {
    query = `?tag=${tag}`;
  }

  useEffect(() => {
    if (activePage != page) {
      router.push(`/${locale}/questions${query}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 0, sm: 3, md: 2 }}>
          <SideBar t={t} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 9, md: 7 }}>
          <Stack>
            {questionsArray.map((question) => (
              <QuestionListCard
                t={t}
                question={question}
                key={question.id}
                diffTZ={diffTZ}
                locale={locale}
              />
            ))}
            <Space h="md" />
            <Center>
                <Pagination
                  total={Math.ceil(questionsNumber / 15)}
                  siblings={2}
                  radius="md"
                  visibleFrom="md"
                  onChange={setPage}
                  defaultValue={page}
                />
                <Pagination
                  onChange={setPage}
                  defaultValue={page}
                  total={Math.ceil(questionsNumber / 15)}
                  siblings={1}
                  radius="md"
                  hiddenFrom="md"
                />
            </Center>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 0, md: 3 }}>
          <RecommonQuestion t={t} />
        </Grid.Col>
      </Grid>
    </>
  );
}

export function QuestionListCard({
  t,
  question,
  diffTZ,
  locale,
}: {
  t: ListLanguage;
  question: Questions;
  diffTZ: number;
  locale: string;
}) {
  const router = useRouter();
  const now = moment();
  const askedAtMoment = moment(question.create_at).utcOffset(diffTZ);

  const timeDifferenceInDays = now.diff(askedAtMoment, "days");

  const askedAtTime =
    timeDifferenceInDays < 1
      ? askedAtMoment.fromNow()
      : askedAtMoment.format(SimpleTimeDisplay);
  const vote = question.vote_up - question.vote_down;
  return (
    <Card shadow="sm" padding="xs" radius="md" withBorder>
      <Grid>
        <Grid.Col span={{ base: 0, md: 2 }}>
          <Stack align="flex-end" gap="5px" justify="flex-end">
            <Text size="sm">
              {vote <= 0 ? "" : vote} {t.votes}
            </Text>
            <Text size="sm">
              {question.answers} {t.answers}
            </Text>
            <Text size="sm">
              {question.views} {t.views}
            </Text>
            <Text size="sm">1 {t.online}</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 10 }}>
          <Stack gap="0px">
            <Group gap="sm" wrap="nowrap">
              <FaCheck color="#69db7c" size={20} />
              <Anchor
                underline="hover"
                href={websiteUrl + `/${locale}/questions/${question.id}`}
                c="#fd7e14"
              >
                <Text size="lg">{question.title}</Text>
              </Anchor>
            </Group>
            <Text lineClamp={2} size="md">
              {convert(`${question.content}`)}
            </Text>
            <Space h="xs"></Space>
            <Group gap="sm" justify="space-between">
              <Group gap="5px">
                {question.tags_name.map((tagName) => (
                  <Badge size="xs" variant="light" radius="sm" key={tagName}>
                    {tagName}
                  </Badge>
                ))}
              </Group>
              <Group gap="5px">
                <Avatar
                  variant="filled"
                  radius="md"
                  src={question.questioner_avatar}
                  size="sm"
                />
                <Text size="xs" c="gray">
                  <Anchor underline="hover" onClick={() => {}} c="gray">
                    {question.questioner_name}
                  </Anchor>{" "}
                  {t.askAt} {askedAtTime}
                </Text>
              </Group>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
