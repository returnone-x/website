import { apiUrl } from "@/config/config";
import axios, { AxiosError } from "axios";

export async function checkUsername(username: string) {
  let data = JSON.stringify({
    user_name: username,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: apiUrl + "/auth/usernameexist",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    validateStatus: function () {
        return true; // 将所有状态码都视为成功
    },
  };

  return await axios.request(config)
}
