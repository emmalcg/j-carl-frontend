require('dotenv').config()

module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ['res.cloudinary.com'],
  },

  env: {
    API_URL: process.env.API_URL,
    MEDIA_URL: process.env.MEDIA_URL
  },
  reactStrictMode: false,
}
