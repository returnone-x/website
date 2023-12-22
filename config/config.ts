const env = process.env.NODE_ENV
import {Pathnames} from 'next-intl/navigation';

export const API_URL = (env === "development" ? 'https://returnone.nightcat.xyz/api/v1': 'https://returnone.nightcat.xyz/api/v1')
export const WEBSITE_URL = (env === "development" ? 'https://returnone.nightcat.xyz/': 'ttps://returnone.nightcat.xyz/')
export const locales = ["en", "zh-tw"];

export const pathnames = {
  '/': '/',
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;