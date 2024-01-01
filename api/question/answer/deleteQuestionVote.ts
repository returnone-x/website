import { API_URL } from "@/config/config";
import axios from "axios";

export async function DeleteQuestionAnserVote(answerId: string) {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: API_URL + `/user/question/deletevote/${answerId}`,
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}
