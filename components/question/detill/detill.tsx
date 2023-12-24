import { GetQuesiton } from "@/api/question/getQuestion";
import { Space } from "@mantine/core";
import { notFound } from "next/navigation";
import { DetillCompnent } from "./detillCompents";

export async function QuestionDetill({ questionId }: { questionId: string }) {
  const questionDetill = await GetQuestionDetill(questionId);
  if (questionDetill === "") {
    return notFound();
  }

  return (
    <>
      <DetillCompnent questionDetill={questionDetill} />
    </>
  );
}

async function GetQuestionDetill(questionId: string) {
  const res = await GetQuesiton(questionId);
  if (res.status != 200){
    return ""
  } else {
    return res.data
  }
}
