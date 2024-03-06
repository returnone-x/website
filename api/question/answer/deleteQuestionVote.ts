import { API_URL } from "@/config/config";
import axios from "axios";

export async function DeleteQuestionAnswerVote(answerId: string) {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: API_URL + `/user/question/answer/deletevote/${answerId}`,
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}
