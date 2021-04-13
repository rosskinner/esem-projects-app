import React from 'react'
import { getStrapiMedia } from '../lib/api'
import ReactMarkdown from 'react-markdown'
import Image from './image'
import ProjectContent from './project-content'
import Text from './text'
import Video from './video'
import Audio from './audio'
import { motion } from 'framer-motion'

const Project = ({ project, global, contactpage, prev, next }) => {
  let bannerImage = ''
  for (let i = 0; i < project.media.length; i++) {
    const media = project.media[i]
    media.type = media.__component

    if (media.type.includes('video-images') && bannerImage.length === 0) {
      bannerImage = media.media[0]
    }
  }

  return (

    <motion.div
      className='flex flex-column'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
    >

      <ProjectContent className='w-100 w-25-l pt6 fixed-l' project={project} />
      <div className='project-details w-100 w-75-l self-end-l'>
        <div className='project-container top-0 w-100'>
          <div className='banner-container w-100 flex center'>
            <img src={getStrapiMedia(bannerImage)} alt={bannerImage.alternativeText} className='relative w-100 justify-center center cover' />
          </div>
        </div>

        <div className='w-100 flex flex-column'>
          <div className='project-details w-100 flex flex-column relative mt4 pb4'>

            <div className='w-100 w-two-thirds-l ph4 ph0-l f6 flex flex-wrap flex-column flex-row-l '>
              <div className='w-100 w-50-l project-det flex flex-column flex-wrap pr5-l'>
                <p className='b'>Project Details</p>
                <ReactMarkdown source={project.details} escapeHtml={false} />
              </div>
              {project.team &&
                <div className='w-50-l pt5 pt0-l project-det flex flex-column flex-wrap pr5-l'>
                  <p className='b'>Team</p>
                  <ReactMarkdown source={project.team} escapeHtml={false} />
                </div>}
            </div>

          </div>
        </div>
        <div className='w-100 mw8 pv4 pl4 pr4 pl0-l pr5-l details f4'>
          <ReactMarkdown source={project.body} escapeHtml={false} />
        </div>
        {project.media.map((media, key) => {
          if (media.__component.includes('video-images')) {
            return (
              <Image key={key} media={media.media} />
            )
          } else if (media.__component.includes('text')) {
            return (
              <Text key={key} text={media.text} />
            )
          } else if (media.__component.includes('vimeo')) {
            return (
              <Video key={key} video={media} />
            )
          } else if (media.__component.includes('sound-cloud')) {
            return (
              <Audio key={key} audio={media} caption={media.caption} />
            )
          } else {
            return <></>
          }
        })}
      </div>
    </motion.div>
  )
}

export default Project
