import createMiddleware from "next-intl/middleware";
import { locales } from "./config/config";
import { NextRequest } from "next/server";

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

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/",  "/(zh-tw|en)/:path*", '/((?!_next|_vercel|.*\\..*).*)'],
};
