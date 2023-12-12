import { API_URL } from "@/config/config";
import axios, { AxiosError } from "axios";

export async function checkAuthorizationa() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: API_URL + "/auth/authorizationa",
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: function () {
        return true; // 将所有状态码都视为成功
    },
  };

  return await axios.request(config)
}
