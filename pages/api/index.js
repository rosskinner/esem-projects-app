export default function Api () {
  fetch('https://api.heroku.com/apps/esem-projects-app/builds', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/vnd.heroku+json; version=3' },
    body: JSON.stringify({
      buildpacks: [{
        url: 'https://github.com/heroku/heroku-buildpack-nodejs',
        name: 'heroku/nodejs'
      }
      ],
      source_blob: {
        url: 'https://github.com/rosskinner/esem-projects-app/archive/refs/tags/v1.tar.gz'
      }
    })
  }).then((res) => {
    // Do a fast client-side transition to the already prefetched dashboard page
    console.log(res)
  })
}
