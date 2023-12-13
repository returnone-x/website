import { API_URL } from "@/config/config";
import axios from "axios";

export async function postLogin( email: string, password: string) {
  let data = JSON.stringify({
    "email": email,
    "password": password,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + "/auth/login",
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
