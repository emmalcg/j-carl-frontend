require('dotenv').config()

module.exports = {
   images: {
    domains: ['localhost'],
  },

  env: {
    API_URL: process.env.API_URL,
    MEDIA_URL: process.env.MEDIA_URL
  },
  reactStrictMode: true,
}

//const path = require('path')

//module.exports = {
//    reactStrictMode: true,
//    webpack: config => {
//        config.resolve.alias['components'] = path.join(__dirname, 'components')
//        config.resolve.alias['public'] = path.join(__dirname, 'public')

//        return config
//    }
//}
