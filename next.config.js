const Images = require('next-images')
const withPlugins = require('next-compose-plugins')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const BundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = {
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
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    return config
  }
}

module.exports = withPlugins([
  [BundleAnalyzer],
  [Images, {
    images: {
      disableStaticImages: true,
      domains: ['localhost', 'res.cloudinary.com', 'herokuapp.com', 'esemprojects.com']
    },
    links: {
      domains: ['api.heroku.com', 'www.linkedin.com', 'linkedin.com']
    }
  }]
  // your other plugins here
])
