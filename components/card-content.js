import { m, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const CardContent = ({ link, project, thumbnail, margin, ratio, category, image, imageObject, description }) => {
  let cat = [category]
  const [loaded, setLoaded] = useState(false)
  const [play, setPlay] = useState(false)
  const [suspend, setSuspend] = useState(false)
  const animationControls = useAnimation()

  const animationVariants = {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  if ((typeof category === 'string')) cat = [{ name: category }]

  if (project.categories) {
    cat = project.categories
  } else if (project.tags) {
    cat = project.tags
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

  const onPlay = () => {
    setLoaded(true)
    setPlay(true)
  }
  const checkSuspended = () => {
    if (!play) setSuspend(true)
  }
  let fallback = ''
  if (thumbnail) {
    if (imageObject.mime.includes('video')) thumbnail.split('upload')[0] += 'upload/q_auto:good' + thumbnail.split('upload')[1]

    const remove = thumbnail.split('/')
    remove[remove.length - 1] = imageObject.hash + '.png'
    fallback = remove.join('/')
  }

  return (
    <>
      <m.div
        className='db'
        whileHover={{
          opacity: link ? 0.4 : 1,
          transition: { duration: 0.5 }
        }}
      >
        <m.div
          className={`aspect-ratio ${ratio}`}
          initial='initial'
          animate={animationControls}
          variants={animationVariants}
          transition={{ ease: 'easeIn', duration: 1 }}
        >
          {thumbnail &&
            <>
              {imageObject.mime.includes('image') &&
                <Image
                  className='project-thumb aspect-ratio--object cover' src={thumbnail} layout='fill'
                  objectFit='cover'
                  alt={imageObject.alternativeText || imageObject.name}
                  onLoad={checkLoaded}
                />}

              {imageObject.mime.includes('video') &&
                <video
                  autoPlay
                  loop
                  playsInline
                  preload='auto'
                  muted
                  className={`project-thumb aspect-ratio--object cover ${play ? 'o-1' : 'o-0'}`} src={thumbnail}
                  alt={imageObject.alternativeText}
                  onPlay={onPlay}
                  onCanPlay={checkLoaded}
                  onSuspend={checkSuspended}
                />}

              {imageObject.mime.includes('video') && !play &&
                <Image
                  className='project-thumb aspect-ratio--object cover' src={fallback} layout='fill'
                  objectFit='cover'
                  alt={imageObject.alternativeText || imageObject.name}
                  onLoad={checkLoaded}
                />}
            </>}

        </m.div>
      </m.div>
      <div className='db'>
        {!image &&
          <>
            <h2 className={`f6 db b ${margin}`}>
              {project.title || project.name}
            </h2>

            {/* <span className='f6 db'> */}
            <div className='db flex flex-row flex-wrap'>
              {cat.map((c, i) => {
                let comma = ''
                if (i !== cat.length - 1) comma = ','
                return (
                  <h3 className='f6 ttc dib pr2' key={i}>{`${c.name}${comma}`} </h3>
                )
              })}
            </div>
            {description &&
              <p className='f6 details team-description'>{project.description}</p>}

            {project.email &&
              <a className='f6 details underline' href={`mailto:${project.email}`} rel='noreferrer' target='_blank'>{project.email}</a>}

          </>}

      </div>
    </>
  )
}

export default CardContent
