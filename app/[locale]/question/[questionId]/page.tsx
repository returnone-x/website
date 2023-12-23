import { QuestionDetill } from "@/components/question/detill/detill";
import { Container } from "@mantine/core";
import React from "react";

export default function questionPage({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  return (
    <Container size="xl">
      <QuestionDetill questionId={questionId} />
    </Container>
  );
}
