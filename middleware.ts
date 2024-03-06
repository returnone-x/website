import createMiddleware from "next-intl/middleware";
import { locales } from "./config/config";
import { NextResponse, NextRequest } from "next/server";
import { middlewareRefreshToken } from "./api/Auth/middlewareRefreshToken";
import { middlewareCheckAuthorizationa } from "./api/Auth/middlewareCheckAuthorizationa";

export default async function middleware(request: NextRequest) {
  // get cookie locale(language)
  const defaultLocale = request.headers.get("NEXT_LOCALE") || "en";

  const handleI18nRouting = createMiddleware({
    locales: locales,
    defaultLocale,
    localeDetection: true,
  });
  // set response
  const response = handleI18nRouting(request);

  response.headers.set("NEXT_LOCALE", defaultLocale);

  // get refreshToken
  const refreshToken = request.cookies.get("refreshToken");
  // if get refresh Token
  if (refreshToken) {
    const res = await middlewareCheckAuthorizationa(request.headers);
    const jsonData = await res.json();
    if (
      res.status === 401 ||
      jsonData.message === "The token will expire in the near future"
    ) {
      const res = await middlewareRefreshToken(request.headers);
      if (res.status != 200) {
        return response;
      }
      response.headers.set("set-cookie", res.headers.get("set-cookie"));

      return response;
    }
  }
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/",  "/(zh-tw|en)/:path*", '/((?!_next|_vercel|.*\\..*).*)'],
};
