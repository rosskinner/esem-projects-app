import React from 'react'
import Link from 'next/link'
import { getStrapiMedia } from '../lib/api'

const Card = ({ project, width, category, path, link = true, image = false }) => {
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
            <Content project={project} thumbnail={thumbnail} margin={margin} ratio={ratio} category={category} image={image} imageObject={imageObject} />
          </a>
        </Link>}
      {!link &&
        <span className={`project-card details ${padding} white ${width}`}>
          <Content project={project} thumbnail={thumbnail} margin={margin} ratio={ratio} category={category} image={image} imageObject={imageObject} />
        </span>}
    </>

  )
}

const Content = ({ project, thumbnail, margin, ratio, category, image, imageObject }) => {
  let cat = [category]

  if ((typeof category === 'string')) cat = [{ name: category }]

  if (project.categories) cat = project.categories

  return (
    <>
      <div className='db'>
        <div className={`aspect-ratio ${ratio}`}>
          {/* <div style={{ backgroundImage: `url(${thumbnail})` }} className='bg-center contain aspect-ratio--object' /> */}
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
              if (i !== cat.length - 1) comma = ' , '
              return (
                <h3 className='f6 ttc dib pr2' key={i}>{c.name} {comma} </h3>
              )
            })}
            {/* </span> */}
          </>}

      </div>
    </>
  )
}

export default Card
