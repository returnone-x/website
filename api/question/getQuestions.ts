import { API_URL } from "@/config/config";
import axios from "axios";

export async function GetQuestions(Query: string) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: API_URL + "/public/question" + Query,
  };
  return await axios.request(config);
}