import { API_URL } from "@/config/config";
import axios from "axios";

export async function GetAvatarFromServerSide(user_id: string) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: API_URL + `/user/avatar/${user_id}`,
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}

export async function GetAvatar() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: API_URL + "/user/avatar",
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: function () {
      return true;
    },
  };
  return await axios.request(config);
}
