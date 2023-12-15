import { API_URL } from "@/config/config";
import axios from "axios";

export async function getLogout() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: API_URL + "/auth/logout",
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: function () {
        return true;
    },
  };
  return await axios.request(config)
}
