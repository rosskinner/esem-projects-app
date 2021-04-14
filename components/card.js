import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMedia } from '../lib/api'
import { AnimatePresence, motion } from 'framer-motion'

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

  if ((typeof category === 'string')) cat = [{ name: category }]

  if (project.categories) {
    cat = project.categories
  } else if (project.tags) {
    cat = project.tags
  }

  return (
    <>
      <div className='db'>
        <div className={`aspect-ratio ${ratio}`}>
          {/* <div className='project-thumb aspect-ratio--object cover' alt={imageObject.alternativeText} style={{ backgroundImage: `url(${thumbnail})` }} /> */}
          <Image
            className='project-thumb aspect-ratio--object cover' src={thumbnail} layout='fill'
            objectFit='cover'
            alt={imageObject.alternativeText}
          />
        </div>
      </div>
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
                <h3 className={`f6 ttc dib pr2 ${description ? 'secondary-color' : ''}`} key={i}>{c.name} {comma} </h3>
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
