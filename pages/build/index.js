import React, { useEffect } from 'react'

const Build = () => {
  useEffect(() => {
    fetch('https://api.heroku.com/apps/esem-projects-app/builds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/vnd.heroku+json; version=3', Authorization: 'Bearer 71fcfb31-00b7-4387-9007-48082e047027' },
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
      // Do a fast client-side transition to the already prefetched dashboard page
      console.log(res)
      // return res
    })
  }, [])

  return (
    <div />
  )
}

export default Build
