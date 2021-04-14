import { useEffect, useState } from 'react'
import { getStrapiMedia } from '../lib/api'
import ReactMarkdown from 'react-markdown'

import Image from 'next/image'
import { LazyMotion, m, domAnimation } from 'framer-motion'
import arrow from '../assets/arrow.png'
import ProjectComponents from './project-components'

import dynamic from 'next/dynamic'
const ProjectContent = dynamic(() => import('./project-content'))

const Project = ({ project, global, contactpage, prev, next }) => {
  const [scroll, setScroll] = useState(true)
  let bannerImage = ''
  for (let i = 0; i < project.media.length; i++) {
    const media = project.media[i]
    media.type = media.__component

    if (media.type.includes('video-images') && bannerImage.length === 0) {
      bannerImage = media.media[0]
    }
  }

  useEffect(() => {
    function handleScroll (e) {
      const top = (window.scrollY < 100)
      if (scroll !== top) {
        setScroll(top)
      }
    }
    window.addEventListener('scroll', handleScroll, false)
    return () => {
      window.removeEventListener('scroll', handleScroll, false)
    }
  }, [scroll])

  return (

    <div className='flex flex-column'>

      <ProjectContent className='w-100 w-25-l pt6 fixed-l' project={project} />
      <div className='project-details w-100 w-75-l self-end-l'>
        <div className='project-container top-0 w-100'>
          <LazyMotion features={domAnimation}>
            <m.div
              className='banner-container w-100 flex center relative' initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeIn', duration: 1 }}
            >
              <Image src={getStrapiMedia(bannerImage)} layout='fill' objectFit='cover' alt={bannerImage.alternativeText} title={bannerImage.caption} className='relative w-100 justify-center center cover' />
              <m.img
                className='absolute read-indicator white f2'
                initial={{ opacity: 1 }}
                animate={{ opacity: scroll ? 1 : 0 }}
                src={arrow}
                alt='read more'
              />
            </m.div>

          </LazyMotion>
        </div>

        <div className='w-100 flex flex-column'>
          <div className='project-details w-100 flex flex-column relative mt4 pb4'>

            <div className='w-100 mw8 ph4 ph0-l f6 flex flex-wrap flex-column flex-row-l '>
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
        <ProjectComponents media={project.media} />
      </div>
    </div>
  )
}

export default Project
