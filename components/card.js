import React from 'react'
import Link from 'next/link'
import { getStrapiMedia } from '../lib/api'

const Card = ({ project, width, category, path, link = true, image = false, description = false }) => {
  const imageObject = project.collectionImage
  const url = project.collectionImage.formats === null ? project.collectionImage : project.collectionImage.formats.medium
  const thumbnail = getStrapiMedia(url)
  //
  // console.log(thumbnail)

  let ratio = 'aspect-ratio--4x3'
  let margin = 'mt3'
  let padding = 'ph3 pb5'
  if (width === 'w-third') {
    ratio = 'aspect-ratio--3x4'
    margin = 'mt3'
    padding = 'ph4 pb3'
  }
  return (
    <>
      {link &&
        <Link as={`${path}/${project.slug}`} href={`${path}/[id]`}>
          <a className={`project-card details ${padding} white ${width}`}>
            <Content project={project} thumbnail={thumbnail} margin={margin} ratio={ratio} category={category} image={image} imageObject={imageObject} description={description} />
          </a>
        </Link>}
      {!link &&
        <span className={`project-card details ${padding} white ${width}`}>
          <Content project={project} thumbnail={thumbnail} margin={margin} ratio={ratio} category={category} image={image} imageObject={imageObject} description={description} />
        </span>}
    </>

  )
}

const Content = ({ project, thumbnail, margin, ratio, category, image, imageObject, description }) => {
  let cat = [category]

  if ((typeof category === 'string')) cat = [{ name: category }]

  if (project.categories) cat = project.categories

  return (
    <>
      <div className='db'>
        <div className={`aspect-ratio ${ratio}`}>
          <img src={thumbnail} alt={imageObject.alternativeText} className='card-img contain aspect-ratio--object' />
        </div>
      </div>
      <div className='db'>
        {!image &&
          <>
            <h2 className={`f6 db ${margin}`}>
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
