// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const { withBlitz } = require("@blitzjs/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
};

// eslint-disable-next-line no-undef
module.exports = withBlitz(nextConfig);
