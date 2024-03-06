import { API_URL } from "@/config/config";
import axios from "axios";

export async function QuestionUpvote(
  question_id: string,
) {
  
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + `/user/question/upvote/${question_id}`,
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}
