import { QuestionDetill } from "@/components/question/detill/detill";
import { Container } from "@mantine/core";
import { useTranslations } from "next-intl";
import React from "react";

export default function questionPage({
  params: { questionId, locale },
}: {
  params: { questionId: string, locale: string };
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations("GetQuestion");
  const signipLoginTranslate = {
    views: t("views"),
    askAt: t("askAt"),
    updateAt: t("updateAt"),
    edited: t("edited"),
    loadMore: t("loadMore"),
    vote: t("vote"),
    voted: t("voted"),
    answer: t("answer"),
    comment: t("comment"),
    answerThisQuestion: t("answerThisQuestion"),
    warnDeleteAnswer: t("warnDeleteAnswer"),
    warnDeleteAnswerDetil: t("warnDeleteAnswerDetil"),
    confirm: t("confirm"),
    cancel: t("cancel"),
    delete: t("delete"),
    successfulDeleteAnswer: t("successfulDeleteAnswer"),
    successfulDeleteAnswerDetil: t("successfulDeleteAnswerDetil"),
    warnDeleteQuestion: t("warnDeleteQuestion"),
    warnDeleteQuestionDetil: t("warnDeleteQuestionDetil"),
    successfulDeleteQuestion: t("successfulDeleteQuestion"),
    successfulDeleteQuestionDetil: t("successfulDeleteQuestionDetil"),
  };


  return (
    <Container size="1450px">
      <QuestionDetill questionId={questionId} t={signipLoginTranslate} locale={locale}/>
    </Container>
  );
}
