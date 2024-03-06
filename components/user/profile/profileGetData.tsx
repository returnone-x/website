import { GetQuestions } from "@/api/question/getQuestions";

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
  page,
  tag,
}: {
  t: ListLanguage;
  query: string;
  page: number;
  tag: string;
}) {
  const questionData = await getQuestions(query);
  const questionsArray: Questions[] = questionData.data as Questions[];
  const questionsNumber: number = questionData.questions_number as number;

  return <QuestionListComponents t={t} questionsArray={questionsArray} questionsNumber={questionsNumber} page={page} tag={tag}/>;
}

async function getQuestions(query: string) {

  const res = await GetQuestions(query);

  if (res.status != 200) {
    return [];
  }

  return res.data ;
}
