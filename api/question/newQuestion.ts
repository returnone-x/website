import { API_URL } from "@/config/config";
import axios from "axios";

type TagInfo = {
  tag: string;
  version: string;
};

export async function newQuestionPost(
  title: string,
  content: string,
  tags: TagInfo[]
) {
  let data = JSON.stringify({
    title: title,
    content: content,
    tags: tags,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + "/user/question/new",
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