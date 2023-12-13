import { API_URL } from "@/config/config";
import axios from "axios";

export async function rename(username: string) {
  let data = JSON.stringify({
    "new_username": username,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + "/user/rename",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    validateStatus: function () {
        return true;
    },
  };
  return await axios.request(config)
}
