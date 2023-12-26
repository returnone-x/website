import { GetQuesiton } from "@/api/question/getQuestion";
import { Space } from "@mantine/core";
import { notFound } from "next/navigation";
import { DetillCompnent } from "./detillCompents";
import { cookies } from "next/headers";

export type QuestionLanguage = {
  views: string;
  postAt: string;
  updateAt: string;
  edited: string;
  loadMore: string;
  vote: string;
  voted: string;
}
export async function QuestionDetill({ questionId, t }: { questionId: string, t: QuestionLanguage }) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("accessToken");
  const questionDetill = await GetQuestionDetill(questionId, refreshToken ? refreshToken.name + "=" + refreshToken.value : ""  );
  if (questionDetill === "") {
    return notFound();
  }

  return (
    <>
      <DetillCompnent questionDetill={questionDetill} t={t}/>
    </>
  );
}

async function GetQuestionDetill(questionId: string, accessToken: string) {
  const res = await GetQuesiton(questionId, accessToken);
  if (res.status != 200){
    return ""
  } else {
    return res.data
  }
}
