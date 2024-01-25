import { GetQuestions } from "@/api/question/getQuestions";
import { QuestionListComponents } from "./quesitons";

export type ListLanguage = {
  views: string;
  askAt: string;
  votes: string;
  online: string;
  answers: string;
  home: string;
  hotQuestion: string;
  tags: string;
  saved: string;
  yourQuestions: string;
  yourAnswer: string;
  history: string;
  recommend: string;
};

export type Questions = {
  id: string;
  Questioner_id: string;
  title: string;
  content: string;
  tags_name: string[];
  tags_version: string[];
  views: number;
  create_at: string;
  update_at: string;
  questioner_name: string;
  questioner_avatar: string;
  vote_down: number;
  vote_up: number;
  answers: number;
};

export async function Question({
  t,
  query,
}: {
  t: ListLanguage;
  query: string;
}) {
  const questionData = await getQuestions(query);
  const questionsArray: Questions[] = questionData as Questions[];
  
  return <QuestionListComponents t={t} questionsArray={questionsArray}/>;
}

async function getQuestions(query: string) {

  const res = await GetQuestions(query);

  if (res.status != 200) {
    return [];
  }

  return res.data.data ;
}
