import { API_URL } from "@/config/config";
import axios from "axios";

export async function UpdateUsername(
  username: string,
) {
  let data = JSON.stringify({
    username: username,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + "/user/setting/reset/username",
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
