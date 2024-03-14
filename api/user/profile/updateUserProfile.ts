import { API_URL } from "@/config/config";
import axios from "axios";

export async function UpdateUserAllProfile(
  bio: string,
  public_email: string,
  pronouns: string,
  related_links: string[]
) {
  let data = JSON.stringify({
    bio: bio,
    public_email: public_email,
    pronouns: pronouns,
    related_links: related_links 
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: API_URL + "/user/setting/resetall/profile",
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
