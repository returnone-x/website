import { API_URL } from "@/config/config";
import axios, { AxiosError } from "axios";

export async function checkUsername(username: string) {
  let data = JSON.stringify({
    user_name: username,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + "/auth/usernameexist",
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
