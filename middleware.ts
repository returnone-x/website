import createMiddleware from 'next-intl/middleware';
import { locales } from './config/config';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
 
  // Used when no locale matches
  defaultLocale: 'en',
  localeDetection: true,
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh-tw|en)/:path*']
};