import { useEffect, useState } from 'react'
import { getStrapiMedia } from '../lib/api'
import { m, useAnimation, LazyMotion, domAnimation } from 'framer-motion'
import Image from 'next/image'

const Img = ({ media }) => {
  const width = 'w-100'
  const cols = 1

  let gridStyle = 'onecol onecol-l'

  if (media.length > 1) {
    // width = 'w-100 w-50-l'
    // cols = 2
    gridStyle = 'onecol twocol-l'
  }
  const animationVariants = {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  const handleResize = () => {
    // let tHeight = 0
    const widthEm = window.innerWidth / parseFloat(
      getComputedStyle(
        document.querySelector('body')
      )['font-size']
    )

    if (widthEm > 60) {
      media.map((m, key) => {
        m.index = key
        m.orientation = 'landscape'

        let ratio = 0.625
        if (m.width < m.height) {
          m.orientation = 'portrait'
          ratio = 1.25
        }

        const width = ((window.innerWidth * 0.75) / cols) - ((2 * 16) * 3)
        m.newHeight = width * ratio + (2 * 16) * 2
      })
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize, false)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <div className='w-100'>

      <div className={`w-100 grid ${gridStyle}`}>
        {media.map((me, key) => {
          const [loaded, setLoaded] = useState(false)
          const animationControls = useAnimation()
          // console.log(m)
          const url = (me.formats === null || Object.keys(me.formats).length === 0) ? me : (me.formats.large ? me.formats.large : me)
          const mediaUrl = getStrapiMedia(url)
          let ratio = '8x5'

          if (me.width < me.height) ratio = '8x10'

          useEffect(() => {
            if (loaded) {
              animationControls.start('visible')
            }
          }, [loaded])

          const checkLoaded = (e) => {
            setLoaded(true)
          }

          return (

            <LazyMotion key={key} features={domAnimation}>

              <m.div
                key={key} className={`relative ${width} grid-item grid-item-${me.orientation}`}
                initial='initial'
                animate={animationControls}
                variants={animationVariants}
                transition={{ ease: 'easeIn', duration: 1 }}
              >
                <div className={`aspect-ratio aspect-ratio--${ratio}`}>
                  <Image
                    className='background-image cover center aspect-ratio--object' src={mediaUrl} layout='fill' objectFit='cover'
                    alt={me.alternativeText}
                    title={me.caption}
                    quality={100}
                    onLoad={checkLoaded}
                  />
                </div>

                <div className='f8 caption pt2 pl2 pl0-l'><span>{me.caption}</span></div>

              </m.div>
            </LazyMotion>

          )
        })}
      </div>

    </div>
  )
}

export default Img
