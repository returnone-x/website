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
} from "@mantine/core";
import { AxiosResponse } from "axios";
import { TiptapVewContent } from "@/components/editor/editorViewContent";
import { QuestionLanguage } from "./detill";
import { ShowAnswer } from "./answerCompents";
import { Anwser, Comment, QuestionToolbar } from "./questionCompents";

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
            <QuestionToolbar questionDetill={questionDetill} t={t} />
          </Group>
          <Comment questionDetill={questionDetill} t={t} />
          <Divider />
          <ShowAnswer questionDetill={questionDetill} t={t}></ShowAnswer>
          <Space />
          <Anwser t={t} questionDetill={questionDetill}></Anwser>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
