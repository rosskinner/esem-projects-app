import React from 'react'
import Link from 'next/link'
import { getStrapiMedia } from '../lib/api'

const Card = ({ project, width, category, path, link = true, image = false }) => {
  const thumbnail = getStrapiMedia(project.collectionImage.formats.medium || project.collectionImage.formats.thumbnail)
  console.log(thumbnail)

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
          <a className={`project-card ${padding} white ${width}`}>
            <Content project={project} thumbnail={thumbnail} margin={margin} ratio={ratio} category={category} image={image} />
          </a>
        </Link>}
      {!link &&
        <span className={`project-card ${padding} white ${width}`}>
          <Content project={project} thumbnail={thumbnail} margin={margin} ratio={ratio} category={category} image={image} />
        </span>}
    </>

  )
}

const Content = ({ project, thumbnail, margin, ratio, category, image }) => {
  let cat = [category]

  if ((typeof category === 'string')) cat = [{ name: category }]

  if (project.categories) cat = project.categories
  console.log(cat)
  return (
    <>
      <div className='db'>
        <div className={`aspect-ratio ${ratio}`}>
          <div style={{ backgroundImage: `url(${thumbnail})` }} className='bg-center contain aspect-ratio--object' />
        </div>
      </div>
      <div className='db'>
        {!image &&
          <>
            <span className={`f5 db ${margin} mb1`}>
              {project.title || project.name}
            </span>

            <span className='f6 db'>
              {cat.map((c, i) => {
                let comma = ''
                if (i > 0) comma = ' ,'
                return (
                  <span className='ttc' key={i}>{c.name}{comma}</span>
                )
              })}
            </span>
          </>}

      </div>
    </>
  )
}

export default Card
