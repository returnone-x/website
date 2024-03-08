import { API_URL } from "@/config/config";
import axios from "axios";

export async function UpdateUserDisplayName(
  display_name: string,
) {
  let data = JSON.stringify({
    display_name: display_name,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + "/user/setting/reset/displayname",
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
