import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMedia } from '../lib/api'

const Card = ({ project, width }) => {
  console.log(project)
  const thumbnail = getStrapiMedia(project.heroImage.formats.medium)

  let ratio = 'aspect-ratio--4x3'
  if (width === 'w-third') {
    ratio = 'aspect-ratio--3x4'
  }
  return (
    <Link as={`/project/${project.slug}`} href='/project/[id]'>
      <a className={`project-card ph3 pb6 white ${width}`}>
        <div className='db'>
          <div className={`aspect-ratio ${ratio}`}>
            <div style={{ backgroundImage: `url(${thumbnail})` }} className='bg-center contain aspect-ratio--object' />
          </div>
        </div>
        <div className='mt2 db'>
          <span className='f5 db mt4 mb2'>
            {project.title}
          </span>
          <span className='f6 db fancy'>
            {project.categories.map((category, i) => {
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
