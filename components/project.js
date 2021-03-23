import React, { useState } from 'react'
import Carousel from './carousel'
import Nav from './nav'
import ProjectContent from './project-content'

const Project = ({ project, contactpage, prev, next }) => {
  const [showContent, setShowContent] = useState(false)
  console.log(contactpage)
  // const mediaTypes = {
  // 'sound-cloud': <SoundCloud />
  let allMedia = [project.collectionImage]

  for (let i = 0; i < project.media.length; i++) {
    const media = project.media[i]
    media.type = media.__component

    if (media.type.includes('video-images')) {
      allMedia = [...allMedia, ...media.media]
    } else {
      allMedia.push(media)
    }
  }
  // }
  return (
    <>
      <div className='project-container absolute top-0 w-100'>

        <div className={`${showContent ? 'project-overlay' : ''}`}>
          <div className='w-100'>
            <Nav showLogo={false} heading={project.title} contactpage={contactpage} />
          </div>
          <Carousel media={allMedia} />
          <div className='w-100 ph5 pv4 flex details'>
            <div className=' w-70 dib v-mid'>
              <span className='mt0'>{project.description}</span>
            </div>
            <div className='w-30 tr dib v-mid'>
              <span className='mt0 bb bw1 b--white pointer' onClick={() => setShowContent(!showContent)}>Read more...</span>
            </div>
          </div>
        </div>
        <ProjectContent project={project} showContent={showContent} setShowContent={setShowContent} />
      </div>
    </>
  )
}

export default Project
