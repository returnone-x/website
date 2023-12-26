import { QuestionDetill } from "@/components/question/detill/detill";
import { Container } from "@mantine/core";
import { useTranslations } from "next-intl";
import React from "react";

export default function questionPage({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations("GetQuestion");
  const signipLoginTranslate = {
    views: t("views"),
    postAt: t("postAt"),
    updateAt: t("updateAt"),
    edited: t("edited"),
    loadMore: t("loadMore"),
    vote: t("vote"),
    voted: t("voted")
  };


  return (
    <Container size="xl">
      <QuestionDetill questionId={questionId} t={signipLoginTranslate}/>
    </Container>
  );
}
