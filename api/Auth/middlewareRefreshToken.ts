import { API_URL } from "@/config/config";
import axios, { AxiosError } from "axios";

export async function middlewareRefreshToken(headers: Headers) {
  try {
    const refresh_token = await fetch(API_URL + "/auth/refresh", {
      headers,
      credentials: 'include',
    });
    return refresh_token;
  } catch (error: any) {
    return error.response;
  }
}
