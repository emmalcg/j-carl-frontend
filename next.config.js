require('dotenv').config()

module.exports = {
   images: {
    domains: ['localhost'],
  },

  env: {
    API_URL: process.env.API_URL,
    IMG_URL: process.env.IMG_URL
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
