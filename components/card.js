import React from 'react'
import Link from 'next/link'
import { getStrapiMedia } from '../lib/api'

const Card = ({ project, width, category }) => {
  const thumbnail = getStrapiMedia(project.heroImage.formats.medium)
  let cat = [category]
  let ratio = 'aspect-ratio--4x3'
  let margin = 'mt3'
  let padding = 'ph3 pb5'
  if (width === 'w-third') {
    ratio = 'aspect-ratio--3x4'
    margin = 'mt3'
    padding = 'ph4 pb3'
  }
  if (project.categories) cat = project.categories

  return (
    <Link as={`/project/${project.slug}`} href='/project/[id]'>
      <a className={`project-card ${padding} white ${width}`}>
        <div className='db'>
          <div className={`aspect-ratio ${ratio}`}>
            <div style={{ backgroundImage: `url(${thumbnail})` }} className='bg-center contain aspect-ratio--object' />
          </div>
        </div>
        <div className='db'>
          <span className={`f5 db ${margin} mb1`}>
            {project.title}
          </span>

          <span className='f6 db'>
            {cat.map((category, i) => {
              let comma = ''
              if (i > 0) comma = ' ,'
              return (
                <span className='ttc' key={i}>{category.name}{comma}</span>
              )
            })}
          </span>

        </div>
      </a>
    </Link>
  )
}

export default Card
