import React from 'react'
import { getStrapiMedia } from '../lib/api'
import ReactMarkdown from 'react-markdown'
import Moment from 'react-moment'
import SoundCloud from './sound-cloud'
import Images from './images'

const Project = ({ project }) => {
  const imageUrl = getStrapiMedia(project.heroImage)
  console.log(project)
  // const mediaTypes = {
  // 'sound-cloud': <SoundCloud />
  // }
  return (
    <>
      <div id='banner' className='w-100 flex flex-row justify-center items-center'>
        <div className='w-70'>
          <div className='aspect-ratio aspect-ratio--4x3'>
            <div style={{ backgroundImage: `url(${imageUrl})` }} className='hero-image bg-center contain aspect-ratio--object' />
          </div>
        </div>
      </div>
      <div className='project-content ph5 mt6 f3'>
        <div className='w-100'>
          <p className='mb3 project-title'>{project.title}</p>
          <p className='fancy project-description mt0'>{project.description}</p>
        </div>
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

          {/* <SoundCloud id={project.}/> */}
        </div>
      </div>
      {project.media.map((media, i) => {
        const item = media.__component
        if (item.includes('sound-cloud')) {
          return (
            <SoundCloud key={i} embed={media.embed} />
          )
        } else if (item.includes('video-images')) {
          return (
            <Images key={i} media={media.media} />
          )
        } else if (item.includes('video-link')) {
          return (<div key={i} />)
        } else {
          return (<></>)
        }
      })}
    </>
  )
}

export default Project
