import { API_URL } from "@/config/config";
import axios, { AxiosError } from "axios";

export async function refreshToken() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: API_URL + "/auth/refresh",
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: function () {
        return true;
    },
  };

  return await axios.request(config)
}
