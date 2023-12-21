import createMiddleware from "next-intl/middleware";
import { locales } from "./config/config";
import { NextResponse, NextRequest } from "next/server";
import { middlewareRefreshToken } from "./api/Auth/middlewareRefreshToken";
import { middlewareCheckAuthorizationa } from "./api/Auth/middlewareCheckAuthorizationa";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get("NEXT_LOCALE") || "en";

  const handleI18nRouting = createMiddleware({
    locales: locales,
    defaultLocale,
    localeDetection: true,
  });
  const response = handleI18nRouting(request);

  response.headers.set("NEXT_LOCALE", defaultLocale);

  const refreshToken = request.cookies.get("refreshToken");
  if (refreshToken) {
    const res = await middlewareCheckAuthorizationa(request.headers);
    const jsonData = await res.json();
    if (
      res.status === 401 ||
      jsonData.message === "The token will be invalid in twenty minutes"
    ) {
      const res = await middlewareRefreshToken(request.headers);
      if (res.status != 200) {
        return response;
      }
      const accessTokenRegex = /accessToken=([^;]+)/;
      const accessTokenMatch = res.headers
        .get("set-cookie")
        .match(accessTokenRegex);
      const keyValuePairs = res.headers.get("set-cookie").split(";");
      const test = res.headers.getSetCookie();
      const refreshTokenRegex = /refreshToken=([^;]+)/;
      const refreshTokenMatch = res.headers
        .get("set-cookie")
        .match(refreshTokenRegex);
      console.log(accessTokenMatch[1]);
      console.log(refreshTokenMatch[1]);
      const now = new Date();

      const access_token_expiration_time = new Date(
        now.getTime() + 60 * 60 * 1000
      );

      response.cookies.set("accessToken", accessTokenMatch[1], {
        httpOnly: true,
        expires: access_token_expiration_time,
        
      });

      const refresh_token_expiration_time = new Date(
        now.getTime() + 60 * 60 * 1000 * 24 * 30
      );

      response.cookies.set("refreshToken", refreshTokenMatch[1], {
        httpOnly: true,
        expires: refresh_token_expiration_time,
      });
      return response;
    }
  }
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(zh-tw|en)/:path*"],
};
