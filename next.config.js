const withImages = require('next-images')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

module.exports = {
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'herokuapp.com', 'esemprojects.com']
  },
  links: {
    domains: ['api.heroku.com', 'www.linkedin.com', 'linkedin.com']
  },
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
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new DuplicatePackageCheckerPlugin())
    return config
  },
  ...withImages()
}
