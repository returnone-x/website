import { API_URL } from "@/config/config";
import axios from "axios";

export async function QuestionDownVote(
  question_id: string,
) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + `/user/question/downvote/${question_id}`,
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}
