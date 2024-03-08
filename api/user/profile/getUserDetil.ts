import { API_URL } from "@/config/config";
import axios from "axios";

export async function GetUserDetil(accessToken: string) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: API_URL + "/user/setting/detil",
    headers: {
      "Content-Type": "application/json",
      Cookie: accessToken,
    },
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}
