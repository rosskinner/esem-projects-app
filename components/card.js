import React from 'react'
import Link from 'next/link'
import { getStrapiMedia } from '../lib/api'

const Card = ({ project, width, category, path, link = true, image = false, description = false }) => {
  const imageObject = project.collectionImage
  // console.log(project.title, imageObject)
  // if (imageObject === null) {
  //   console.log(project.title)
  // }
  const url =  (project.collectionImage.formats === null || Object.keys(project.collectionImage.formats).length === 0) ? project.collectionImage : project.collectionImage.formats.medium
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
    
  return (
    <>
      {link &&
        <Link as={`${path}/${project.slug}`} href={`${path}/[id]`}>
          <a className={`project-card details ${padding} white w-100 w-third-ns ${width}-l`}>
            <Content width={width} project={project} thumbnail={thumbnail} margin={margin} ratio={ratio} category={category} image={image} imageObject={imageObject} description={description} />
          </a>
        </Link>}
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

  if (project.categories) cat = project.categories

  // const ratiolarge = (((imageObject.width / imageObject.height) > 8/5) || ((imageObject.height / imageObject.width) > 3/4)) && ratio.includes('8x5')

  return (
    <>
      <div className='db'>
        <div className={`aspect-ratio ${ratio}`}>
          {/* {ratiolarge &&
            
          } */}
          <div className='project-thumb aspect-ratio--object cover' alt={imageObject.alternativeText} style={{ backgroundImage: `url(${thumbnail})` }} />
          {/* {!ratiolarge &&
            <img src={thumbnail} alt={imageObject.alternativeText} className='card-img cover aspect-ratio--object' />
          }

          {ratiolarge &&
            <img src={thumbnail} alt={imageObject.alternativeText} className='card-img card-img-ns cover aspect-ratio--object' />
          } */}
          
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
