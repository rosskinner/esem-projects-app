import { useEffect, useState } from 'react'
import { getStrapiMedia } from '../lib/api'
import ReactMarkdown from 'react-markdown'

import Image from 'next/image'
import { LazyMotion, m, domAnimation, useAnimation } from 'framer-motion'
import arrow from '../assets/arrow.png'
import ProjectComponents from './project-components'

import dynamic from 'next/dynamic'
import Link from 'next/link'
const ProjectContent = dynamic(() => import('./project-content'))

const Project = ({ project, global, contactpage, prev, next, scroll }) => {
  const [loaded, setLoaded] = useState(false)
  const animationControls = useAnimation()

  const animationVariants = {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  let bannerImage = ''
  bannerImage = project.collectionImage.mime.includes('image') && !project.collectionImage.mime.includes('gif') ? project.collectionImage : ''
  for (let i = 0; i < project.media.length; i++) {
    const media = project.media[i]
    media.type = media.__component

    if (media.type.includes('video-images') && bannerImage.length === 0) {
      bannerImage = media.media[0]
    }
  }

  useEffect(() => {
    if (loaded) {
      animationControls.start('visible')
      // animationVariants.initial.opacity = 1
    }
  }, [loaded])

  const checkLoaded = (e) => {
    setLoaded(true)
  }

  return (

    <div className='flex flex-column'>

      <ProjectContent className='w-100 w-25-l pt6 fixed-l' project={project} />
      <div className='project-details w-100 w-75-l self-end-l'>
        <div className='project-container top-0 w-100'>
          <LazyMotion features={domAnimation}>
            <m.div
              className='banner-container w-100 flex center relative' initial='initial'
              animate={animationControls}
              variants={animationVariants}
              transition={{ ease: 'easeIn', duration: 1 }}

            >
              {Object.keys(bannerImage).length > 0 &&
                <>
                  <Image
                    src={getStrapiMedia(bannerImage)} layout='fill' objectFit='cover' alt={bannerImage.alternativeText || bannerImage.name} title={bannerImage.caption} className='relative w-100 justify-center center cover'
                    onLoad={checkLoaded}
                  />
                  <m.img
                    className='absolute read-indicator white f2'
                    initial={{ opacity: 1 }}
                    animate={{ opacity: scroll ? 1 : 0 }}
                    src={arrow}
                    alt='read more'
                  />
                </>}

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
              {project.articles.length > 0 &&
                <div className='mt5 db dn-l'>
                  <p className='f6 b'>Read More</p>
                  <div className='flex flex-column pb4'>
                    {project.articles.map((article, key) => {
                      return (
                        <div className='f6 pb3' key={key}>
                          <Link scroll={false} as={`/article/${article.slug}`} href='/article/[id]'>
                            <a className='underline'>{article.title}</a>
                          </Link>
                        </div>
                      )
                    })}
                  </div>
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
