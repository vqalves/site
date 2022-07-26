/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en-US", "pt-BR"],
    defaultLocale: "pt-BR",
    localeDetection: true
  },
}