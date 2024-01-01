import { API_URL } from "@/config/config";
import axios from "axios";

type TagInfo = {
  tag: string;
  version: string;
};

export async function NewQuestionComment(
  quesitonId: string,
  content: string,
  reply: string,
) {
  let data = JSON.stringify({
    content: content,
    reply: reply,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + "/user/question/comment/new/" + quesitonId,
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
