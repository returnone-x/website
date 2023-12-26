import { API_URL } from "@/config/config";
import axios from "axios";

export async function DeleteQuesitonVote(questionId: string) {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: API_URL + `/user/question/deletevote/${questionId}`,
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}
