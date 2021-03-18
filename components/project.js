import React from 'react'
import ReactMarkdown from 'react-markdown'
import Moment from 'react-moment'
// import SoundCloud from './sound-cloud'
// import Images from './images'
import Carousel from './carousel'

const Project = ({ project }) => {
  // const imageUrl = getStrapiMedia(project.heroImage)
  console.log(project)
  // const mediaTypes = {
  // 'sound-cloud': <SoundCloud />
  let allMedia = [project.heroImage]

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
    <div className='project-container relative'>
      <div className='w-100 ph5 pv4'>
        <p className='mb3 f4'>{project.title}</p>
      </div>
      <Carousel media={allMedia} />
      <div className='w-100 ph5 pv4'>
        <span className='fancy mt0 project-description'>{project.description} </span> <span className='f1'>READ MORE...</span>
      </div>
      <div className='project-content ph5 mt6 f3 absolute'>

        <div className='details w-100 flex mt6'>
          <div className='w-50 pr4'>
            <p>
              <strong>
                <Moment format='YYYY'>{project.year}</Moment>
              </strong>
            </p>

            <ReactMarkdown source={project.details} escapeHtml={false} />
            {project.team &&
              <div className='mt5'>
                <ReactMarkdown source={project.team} escapeHtml={false} />
              </div>}

          </div>
          <div className='w-50 pl3'>
            <ReactMarkdown source={project.body} escapeHtml={false} />
          </div>

        </div>
      </div>

    </div>
  )
}

export default Project
