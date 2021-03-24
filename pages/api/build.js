export default function handler (req, res) {
  if (req.method === 'POST') {
    fetch('https://api.heroku.com/apps/esem-projects-app/builds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/vnd.heroku+json; version=3', Authorization: `Bearer ${process.env.API_KEY_BUILD}` },
      body: JSON.stringify({
        buildpacks: [{
          url: 'https://github.com/heroku/heroku-buildpack-nodejs',
          name: 'heroku/nodejs'
        }],
        source_blob: {
          url: 'https://github.com/rosskinner/esem-projects-app/archive/master.tar.gz'
        }
      })
    }).then((res) => {
      res.status(200).json(res.json)
    })
  } else {
    res.status(200).json({ Build: 'Have to post to Build' })
  }
}
