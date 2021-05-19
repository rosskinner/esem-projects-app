const withImages = require('next-images')

module.exports = {
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'herokuapp.com']
  },
  links: {
    domains: ['api.heroku.com', 'www.linkedin.com', 'linkedin.com']
  },
  ...withImages(),
  future: {
    webpack5: true
  },
  reactStrictMode: true,
  async headers () {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=15552000'
          }
        ]
      }
    ]
  }
}
