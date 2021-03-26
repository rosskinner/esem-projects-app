const withImages = require('next-images')

console.log()
module.exports = {
  images: {
    domains: ['localhost', 'res.cloudinary.com']
  },
  links: {
    domains: ['api.heroku.com', 'www.linkedin.com', 'linkedin.com']
  },
  ...withImages()
}
