/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV;

const withNextIntl = require('next-intl/plugin')();
const API_URL = (env === "development" ? 'https://returnone-api.nightcat.xyz/api': 'https://shop-web-api.nightcat.xyz/api')

const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: API_URL + '/:path*',
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig)
