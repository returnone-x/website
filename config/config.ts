const env = process.env.NODE_ENV

export const API_URL = (env === "development" ? 'https://returnone.nightcat.xyz/api/v1': 'https://returnone.tech/api/v1')
export const WEBSITE_URL = (env === "development" ? 'https://returnone.nightcat.xyz/': 'https://returnone.tech/')