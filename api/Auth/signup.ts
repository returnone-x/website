import { backendUrl } from "@/config/config";
import axios from "axios";

export async function postSignUp(username: string, password: string, email: string) {
  let data = JSON.stringify({
    "email": email,
    "password": password,
    "user_name": username
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: backendUrl + "/auth/signup",
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
