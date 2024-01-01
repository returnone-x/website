import { API_URL } from "@/config/config";
import axios from "axios";

export async function QuestionAnswerDownVote(answerId: string) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + `/user/question/answer/downvote/${answerId}`,
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}
