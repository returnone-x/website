import { API_URL } from "@/config/config";
import axios, { AxiosError } from "axios";

export async function middlewareCheckAuthorizationa(headers: Headers) {
  try {
    const authorizationa = await fetch(API_URL + "/auth/authorizationa", {
      headers,
      credentials: 'include',
    });
    return authorizationa;
  } catch (error: any) {
    return error.response;
  }
}
