const withImages = require('next-images')

module.exports = {
  images: {
    domains: ['localhost', 'res.cloudinary.com']
  },
  links: {
    domains: ['api.heroku.com', 'www.linkedin.com', 'linkedin.com']
  },
  ...withImages(),
  future: {
    webpack5: true
  },
  reactStrictMode: true
}
