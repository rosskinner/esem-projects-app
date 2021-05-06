import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMedia } from '../lib/api'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'

const Card = ({ project, width, category, path, link = true, image = false, description = false }) => {
  const imageObject = project.collectionImage
  // console.log(project.title, imageObject)
  // if (imageObject === null) {
  //   console.log(project.title)
  // }
  const url = (project.collectionImage.formats === null || Object.keys(project.collectionImage.formats).length === 0) ? project.collectionImage : project.collectionImage.formats.medium
  const thumbnail = getStrapiMedia(url)
  //
  // console.log(thumbnail)

  let ratio = 'aspect-ratio--8x5 aspect-ratio--8x5-l '
  let margin = 'mt3'
  let padding = 'ph2-ns ph3-l pb3 pb5-l'
  if (width === 'w-third') {
    // ratio = 'aspect-ratio--3x4'
    margin = 'mt3'
    padding = 'ph2-ns ph4-l pb4 pb5-l'
  }
  if (description) ratio = 'aspect-ratio--3x4 aspect-ratio--3x4-l'
  let isCat = false
  if (project.categories) isCat = category ? (project.categories.length > 0 ? project.categories.find(c => c.name === category.name) : null) : true
  if (project.tags) isCat = category ? (project.tags.length > 0 ? project.tags.find(c => c.name === category.name) : null) : true
  return (
    <>
      {link &&
        <AnimatePresence>
          {isCat &&
            <Link scroll={false} as={`${path}/${project.slug}`} href={`${path}/[id]`}>
              <motion.a
                className={`project-card details ${padding} white w-100 w-third-ns ${width}-l pointer`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0, duration: 0.5 }}
              >
                <Content width={width} project={project} thumbnail={thumbnail} margin={margin} ratio={ratio} category={category} image={image} imageObject={imageObject} description={description} />
              </motion.a>
            </Link>}
        </AnimatePresence>}
      {!link &&
        <span className={`project-card details ${padding} white w-100 w-third-ns ${width}-l`}>
          <Content width={width} project={project} thumbnail={thumbnail} margin={margin} ratio={ratio} category={category} image={image} imageObject={imageObject} description={description} />
        </span>}
    </>
  )
}

const Content = ({ width, project, thumbnail, margin, ratio, category, image, imageObject, description }) => {
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
  if (imageObject.mime.includes('video')) thumbnail.split('upload')[0] += 'upload/q_auto:good' + thumbnail.split('upload')[1]
  if (suspend) {
    const remove = thumbnail.split('/')
    remove[remove.length - 1] = imageObject.hash + '.png'
    thumbnail = remove.join('/')
  }

  return (
    <>
      <motion.div
        className='db'
        whileHover={{
          opacity: 0.4,
          transition: { duration: 0.5 }
        }}
      >
        <motion.div
          className={`aspect-ratio ${ratio}`}
          initial='initial'
          animate={animationControls}
          variants={animationVariants}
          transition={{ ease: 'easeIn', duration: 1 }}
        >
          {imageObject.mime.includes('image') &&
            <Image
              className='project-thumb aspect-ratio--object cover' src={thumbnail} layout='fill'
              objectFit='cover'
              alt={imageObject.alternativeText}
              onLoad={checkLoaded}
            />}

          {imageObject.mime.includes('video') && !suspend &&
            <video
              autoPlay
              loop
              playsInline
              preload='auto'
              muted
              className='project-thumb aspect-ratio--object cover' src={thumbnail}
              alt={imageObject.alternativeText}
              onPlay={onPlay}
              onCanPlay={checkLoaded}
              onSuspend={checkSuspended}
            />}
          {imageObject.mime.includes('video') && !play &&
            <Image
              className='project-thumb aspect-ratio--object cover' src={thumbnail} layout='fill'
              objectFit='cover'
              alt={imageObject.alternativeText}
              onLoad={checkLoaded}
            />}

        </motion.div>
      </motion.div>
      <div className='db'>
        {!image &&
          <>
            <h2 className={`f6 db b ${margin}`}>
              {project.title || project.name}
            </h2>

            {/* <span className='f6 db'> */}
            {cat.map((c, i) => {
              let comma = ''
              if (i !== cat.length - 1) comma = ','
              return (
                <h3 className={`f6 ttc dib pr2 ${description ? 'underline' : ''}`} key={i}>{c.name} {comma} </h3>
              )
            })}
            {description &&
              <p className='f4 details'>{project.description}</p>}

            {project.linkedin &&
              <a className='f6 details underline' href={project.linkedin} rel='noreferrer' target='_blank'>LinkedIn</a>}
          </>}

      </div>
    </>
  )
}

export default Card
