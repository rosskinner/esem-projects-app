import React, { useState } from 'react'
import Carousel from './carousel'
import Nav from './nav'
import ProjectContent from './project-content'

const Project = ({ project, global, contactpage, prev, next }) => {
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

  const toggleContent = () => {
    setShowContent(!showContent)
  }
  return (
    <>
      <div className='project-container absolute top-0 w-100'>

        <div className={`${showContent ? 'project-overlay' : ''}`}>
          <div className='w-100'>
            <Nav showLogo={false} heading={project.title} description={project.description} contactpage={contactpage} global={global} />
          </div>
          <Carousel media={allMedia} setShowContent={toggleContent} />
        </div>
        <ProjectContent project={project} showContent={showContent} setShowContent={setShowContent} />
      </div>
    </>
  )
}

export default Project
