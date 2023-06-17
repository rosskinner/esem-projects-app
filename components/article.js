import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { getStrapiMedia } from '../lib/api'
import { m, LazyMotion, useAnimation, domAnimation } from 'framer-motion'
import Image from "next/legacy/image"
import dynamic from 'next/dynamic'
const ArticleBanner = dynamic(() => import('./article-banner'))

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
      <ArticleBanner article={article} />
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
