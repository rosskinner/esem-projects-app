module.exports = {
  siteUrl: process.env.SITE_URL || 'https://esemprojects.com',
  generateRobotsTxt: true,
  priority: 0.5,
  transform: async (config, path) => {
    // custom function to ignore the path
    if (path === '/projects' || path === '/about' || path === '/articles' || path === '/') {
      return {
        loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
        changefreq: config.changefreq,
        priority: 1,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined
      }
    }

    // Use default transformation for all other cases
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined
    }
  }
}
