import { API_URL } from "@/config/config";
import axios from "axios";

export async function GetQuesiton(questionId: string) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: API_URL + `/public/question/${questionId}`,
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}
