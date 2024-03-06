"use client";

import "@mantine/tiptap/styles.css";
import {
  Grid,
  Title,
  Divider,
  Stack,
  Space,
  Group,
  Text,
  Flex,
  Badge,
  Avatar,
  Box,
} from "@mantine/core";
import { AxiosResponse } from "axios";
import { TiptapVewContent } from "@/components/editor/editorViewContent";
import { QuestionLanguage } from "./detill";
import { ShowAnswer } from "./answerCompents";
import { Anwser, Comment, QuestionToolbar } from "./questionCompents";
import classes from "./Detill.module.css";
import moment from 'moment'
import { TimeDisplay } from "@/config/config";
import { ChatBox } from "./chatBox";

export function DetillCompnent({
  questionDetill,
  t,
  locale
}: {
  questionDetill: AxiosResponse<any, any>;
  t: QuestionLanguage;
  locale: string;
}) {
  const dt = new Date();
  let diffTZ = -dt.getTimezoneOffset();

  const askedAtTime = moment(questionDetill.data.create_at).utcOffset(diffTZ).format(TimeDisplay);  
  const updateAtTime = moment(questionDetill.data.update_at).utcOffset(diffTZ).format(TimeDisplay);  
  
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
      <Grid.Col span={{ base: 0, md: 5 }}>
        <ChatBox></ChatBox>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 7 }}>
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
                {t.views}: {questionDetill.data.views}
              </Text>
              <Text fw={700} size="xs" c="#868e96">
                {t.askAt}: {askedAtTime}
              </Text>
              <Text fw={700} size="xs" c="#868e96">
                {t.updateAt}: {updateAtTime}
              </Text>
            </Flex>
            <Divider />
          </Stack>
          <TiptapVewContent content={questionDetill.data.content} />

          <Group wrap="nowrap" justify="space-between" visibleFrom="xs">
            <QuestionToolbar questionDetill={questionDetill} t={t} locale={locale}/>
            <Group justify="flex-end">
              <Avatar
                variant="filled"
                radius="sm"
                src={questionDetill.data.questioner_avatar}
              />
              <Stack gap="0px">
                <Text size="xs" className={classes.grayIcon}>
                  {t.askAt}: {askedAtTime}
                </Text>
                <Text size="md" truncate="end">
                  {questionDetill.data.questioner_name}
                </Text>
              </Stack>
            </Group>
          </Group>

          <Stack hiddenFrom="xs">
            <Group justify="flex-start">
              <Avatar
                variant="filled"
                radius="sm"
                src={questionDetill.data.questioner_avatar}
              />
              <Stack gap="0px">
                <Text size="xs" className={classes.grayIcon}>
                  {t.askAt}: {askedAtTime}
                </Text>
                <Text size="md" truncate="end">
                  {questionDetill.data?.questioner_name}
                </Text>
              </Stack>
            </Group>
            <QuestionToolbar questionDetill={questionDetill} t={t} locale={locale}/>
          </Stack>

          {/* <Comment questionDetill={questionDetill} t={t} /> */}
          <Divider />
          <ShowAnswer questionDetill={questionDetill} t={t}></ShowAnswer>
          <Space />
          <Anwser t={t} questionDetill={questionDetill}></Anwser>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
