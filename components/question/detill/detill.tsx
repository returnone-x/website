import { GetQuesiton } from "@/api/question/getQuestion";
import { Space } from "@mantine/core";
import { notFound } from "next/navigation";
import { DetillCompnent } from "./detillCompents";
import { cookies } from "next/headers";

export type QuestionLanguage = {
  views: string;
  askAt: string;
  updateAt: string;
  edited: string;
  loadMore: string;
  vote: string;
  voted: string;
  answer: string;
  comment: string;
  answerThisQuestion: string;
  warnDeleteAnswer: string;
  warnDeleteAnswerDetil: string;
  confirm: string;
  cancel: string;
  successfulDeleteAnswer: string;
  successfulDeleteAnswerDetil: string;
  warnDeleteQuestion: string;
  warnDeleteQuestionDetil: string;
  successfulDeleteQuestion: string;
  successfulDeleteQuestionDetil: string;
  delete: string;
};

export async function QuestionDetill({
  questionId,
  t,
  locale,
}: {
  questionId: string;
  t: QuestionLanguage;
  locale: string;
}) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("accessToken");
  const questionDetill = await GetQuestionDetill(
    questionId,
    refreshToken ? refreshToken.name + "=" + refreshToken.value : ""
  );
  if (questionDetill === "") {
    return notFound();
  }

  return (
    <>
      <DetillCompnent questionDetill={questionDetill} t={t} locale={locale}/>
    </>
  );
}

async function GetQuestionDetill(questionId: string, accessToken: string) {
  const res = await GetQuesiton(questionId, accessToken);
  if (res.status != 200) {
    return "";
  } else {
    return res.data;
  }
}
