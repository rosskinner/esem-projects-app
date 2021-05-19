import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { getStrapiURL, getStrapiMedia } from '../lib/api'
import Moment from 'react-moment'
import Link from 'next/link'
import { m, LazyMotion, useAnimation, domAnimation } from 'framer-motion'
import Image from 'next/image'

const Article = ({ article }) => {
  const imageUrl = getStrapiMedia(article.collectionImage)
  const [loaded, setLoaded] = useState(false)
  const animationControls = useAnimation()

  const animationVariants = {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
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

      <div className='w-100 w-25-l pt6 fixed-l'>
        <div className='w-100 ph4 ph5-l pt4 mb3'>
          <h1 className='mb3 f2 heading'>{article.title}</h1>
          <h2 className='mt0 f6'>{article.description}</h2>
        </div>

        <div className='w-100 flex flex-column'>

          <div className='w-100 project-panel ph4 ph5-l'>
            <div className='w-100 pv2 v-mid flex'>
              <div className='w-100'>
                {article.team_member && <Link as={`/about/${article.team_member.slug}`} href='/about/[id]'><p className='mv0 details f6 underline'>by {article.team_member.name}</p></Link>}
                {article.date &&
                  <p className='f6'>
                    <strong>
                      <Moment format='D MMM YYYY'>{article.date}</Moment>
                    </strong>
                  </p>}
                {article.project &&
                  <div className='mt5'>
                    <p className='f6 b'>Related Project</p>
                    <div className='flex flex-column'>
                      <div className='f6'>
                        <Link scroll={false} as={`/project/${article.project.slug}`} href='/project/[id]'>
                          <a className='mv0 f6 details underline'>{article.project.title}</a>

                        </Link>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>

          </div>
        </div>

      </div>
      <div className='project-details w-100 w-75-l self-end-l'>
        <div className='project-container top-0 w-100'>

          <LazyMotion features={domAnimation}>
            <m.div
              className='banner-container w-100 flex center relative' initial='initial'
              animate={animationControls}
              variants={animationVariants}
              transition={{ ease: 'easeIn', duration: 1 }}
            >

              <Image
                src={imageUrl} alt={imageUrl.alternativeText || imageUrl.name} title={imageUrl.caption} layout='fill' objectFit='cover'
                className='relative w-100 justify-center center cover'
                onLoad={checkLoaded}
              />
            </m.div>

          </LazyMotion>
        </div>

        <div className='w-100 flex flex-column'>
          <div className='w-100 mw8 pv4 pl4 pr4 pl0-l pr5-l details f4'>
            <ReactMarkdown source={article.content} linkTarget='_blank' escapeHtml={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
