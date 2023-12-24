"use client";

import { TiptapEditor } from "@/components/editor/editor";
import {
  Accordion,
  Avatar,
  Button,
  Group,
  Blockquote,
  Grid,
  Paper,
  Space,
  Stack,
  TagsInput,
  TextInput,
  Text,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { HiEmojiSad, HiEye } from "react-icons/hi";
import { useState } from "react";
import classes from "./New.module.css";
import { newQuestionPost } from "@/api/question/newQuestion";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

type NewQuestionLanguage = {
  title: string;
  pleaseEnterATitle: string;
  pickTagsTips: string;
  tags: string;
  pleaseEnterTags: string;
  howToAskAGoodQuestion: string;
  titleMustBeLessThan250Letters: string;
  pleasEnterTags: string;
  toMuchContent: string;
  pleaseEnterDescriptions: string;
  content: string;
  reviewYourQuestion: string;
  askANewQuestion: string;
  errorWhenPostQuestionTitle: string;
  errorWhenPostQuestionDes: string;
};

function convertToTagInfoArray(tags: string[]): [string[], string[]] {
  const tags_name: string[] = [];
  const tags_version: string[] = [];

  tags.forEach((tag) => {
    const [tagName, version] = tag.split(":");
    tags_name.push(tagName);
    tags_version.push(version);
  });

  return [tags_name, tags_version];
}

export function NewQuestion({ t }: { t: NewQuestionLanguage }) {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagsError, setTagsError] = useState("");
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");

  const [loading, setLoading] = useState(false);

  const reviewQuestion = async () => {
    let isError = false;
    setLoading(true);
    if (title.length > 250) {
      isError = true;
      setTitleError(t.titleMustBeLessThan250Letters);
    } else if (title.length === 0) {
      isError = true;
      setTitleError(t.pleaseEnterATitle);
    } else {
      setTitleError("");
    }

    if (tags.length === 0) {
      isError = true;
      setTagsError(t.pleasEnterTags);
    } else {
      setTagsError("");
    }

    if (content.length === 0 || content === "<p></p>") {
      isError = true;
      setContentError(t.pleaseEnterDescriptions);
    } else if (content.length > 100000) {
      isError = true;
      setContentError(t.toMuchContent);
    } else {
      setContentError("");
    }

    if (isError) {
      setLoading(false);
    } else {
      
      const result = convertToTagInfoArray(tags);
      const res = await newQuestionPost(title, content, result[0], result[1]);
      if (res.status === 200) {
        router.replace(res.data.data.id)
      } else {
        notifications.show({
          color: "red",
          title: t.errorWhenPostQuestionTitle,
          message: t.errorWhenPostQuestionDes + "\n" + res.data.error,
          icon: <HiEmojiSad size={25} />,
          classNames: classes,
          autoClose: 5000,
        });
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Text
        size="60px"
        fw={900}
        variant="gradient"
        gradient={{ from: "orange", to: "rgba(221, 255, 0, 1)", deg: 90 }}
        className={classes.graytext}
      >
        {t.askANewQuestion}
      </Text>
      <Space h="xl" />
      <Space h="xl" />
      <Grid>
        <Grid.Col span={{ base: 12, sm: 8 }}>
          <Stack>
            <TextInput
              label={t.title}
              placeholder={t.pleaseEnterATitle}
              size="md"
              error={titleError}
              disabled={loading}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
            <TagsInput
              label={t.tags}
              placeholder={t.pleaseEnterTags}
              maxTags={5}
              splitChars={[",", " ", "|"]}
              size="md"
              disabled={loading}
              error={tagsError}
              onChange={setTags}
            />
            <Blockquote
              color="orange"
              icon={<MdOutlineTipsAndUpdates />}
              mt="xl"
            >
              <Text fw={700}> {t.pickTagsTips}</Text>
            </Blockquote>
            <>
              <Text fw={700}> {t.content}</Text>
              <Box pos="relative">
                <LoadingOverlay
                  visible={loading}
                  zIndex={1000}
                  overlayProps={{ radius: "sm", blur: 2 }}
                />
                <TiptapEditor changeContent={setContent} />
              </Box>
              {contentError == "" ? (
                <></>
              ) : (
                <Text c={"#dd3130"}>{contentError}</Text>
              )}
            </>
            <Group justify="space-between">
              <Button
                loading={loading}
                variant="gradient"
                gradient={{
                  from: "rgba(255, 64, 0, 1)",
                  to: "rgba(252, 193, 91, 1)",
                  deg: 90,
                }}
                leftSection={<HiEye />}
                onClick={reviewQuestion}
              >
                {t.reviewYourQuestion}
              </Button>
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 0, sm: 4 }} visibleFrom="sm">
          <Paper shadow="md" radius="lg" withBorder p="xl">
            <Text size="25px" fw={900}>
              {t.howToAskAGoodQuestion}
            </Text>
            <Space h="xl" />
            <AskAGoodQuestionList />
            <Space h="xl" />
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
}

const charactersList = [
  {
    id: "check-already-ask",
    image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
    label: "Bender Bending Rodríguez",
    description: "Fascinated with cooking, though has no sense of taste",
    content:
      "Bender Bending Rodríguez, (born September 4, 2996), designated Bending Unit 22, and commonly known as Bender, is a bending unit created by a division of MomCorp in Tijuana, Mexico, and his serial number is 2716057. His mugshot id number is 01473. He is Fry's best friend.",
  },

  {
    id: "carol",
    image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
    label: "Carol Miller",
    description: "One of the richest people on Earth",
    content:
      "Carol Miller (born January 30, 2880), better known as Mom, is the evil chief executive officer and shareholder of 99.7% of Momcorp, one of the largest industrial conglomerates in the universe and the source of most of Earth's robots. She is also one of the main antagonists of the Futurama series.",
  },

  {
    id: "homer",
    image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
    label: "Homer Simpson",
    description: "Overweight, lazy, and often ignorant",
    content:
      "Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.",
  },
];

function AskAGoodQuestionList() {
  const items = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.label}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{item.content}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return <Accordion chevronPosition="right">{items}</Accordion>;
}

interface AccordionLabelProps {
  label: string;
  image: string;
  description: string;
}
function AccordionLabel({ label, image, description }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      <Avatar src={image} radius="xl" size="lg" />
      <div>
        <Text>{label}</Text>
        <Text size="sm" c="dimmed" fw={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}