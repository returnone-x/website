import { API_URL } from "@/config/config";
import axios from "axios";

export async function DeleteQuestionAnswer(answerId: string) {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: API_URL + `/user/question/answer/delete/${answerId}`,
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}
