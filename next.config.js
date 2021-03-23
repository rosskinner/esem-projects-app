const withImages = require('next-images')

console.log()
module.exports = {
  images: {
    domains: ['localhost', 'res.cloudinary.com']
  },
  ...withImages()
}
