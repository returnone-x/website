import { Question } from "@/components/question/list/list";
import { Container } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function QuestionList({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const t = useTranslations("QuestionList");
  const questionListTranslate = {
    views: t("views"),
    askAt: t("askAt"),
    votes: t("votes"),
    online: t("online"),
    answers: t("answers"),
    home: t("home"),
    hotQuestion: t("hotQuestion"),
    tags: t("tags"),
    saved: t("saved"),
    yourQuestions: t("yourQuestions"),
    yourAnswer: t("yourAnswer"),
    history: t("history"),
    recommend: t("recommend"),
  };

  let query = "";
  const page = searchParams?.page;
  const tag = searchParams?.tag;

  if (page != undefined && tag != undefined) {
    query = `?page=${page}&tag=${tag}`;
  } else if (page != undefined) {
    query = `?page=${page}`;
  } else if (tag != undefined){
    query = `?tag=${tag}`;
  }

  return (
    <>
      <Container size="xl">
        <Question t={questionListTranslate} query={query} />
      </Container>
    </>
  );
}
