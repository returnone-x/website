import { API_URL } from "@/config/config";
import axios from "axios";

export async function NewQuestionAnswer(
  quesitonId: string,
  content: string
) {
  let data = JSON.stringify({
    content: content,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + "/user/question/answer/new/" + quesitonId,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}
