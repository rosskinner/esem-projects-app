import React, { useState } from 'react'
import Carousel from './carousel'
import Nav from './nav'
import ProjectContent from './project-content'

const Project = ({ project, global, contactpage, prev, next }) => {
  const [showContent, setShowContent] = useState(false)
  // console.log(project)
  // const mediaTypes = {
  // 'sound-cloud': <SoundCloud />
  let allMedia = []

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
          <div className='db dn-l w-100 ph4 ph5-l pt4 mb6'>
            <h1 className='mb3 f2 heading'>{project.title}</h1>
            <span className='mt0'>{project.description}</span>
            <div className='w-100 pt4 dib dn-l v-mid'>
              <span className='mt0 underline pointer secondary-color' onClick={toggleContent}>Read more...</span>
            </div>
          </div>
          <Carousel media={allMedia} setShowContent={toggleContent} />
        </div>
        <ProjectContent project={project} showContent={showContent} setShowContent={setShowContent} />
      </div>
    </>
  )
}

export default Project
