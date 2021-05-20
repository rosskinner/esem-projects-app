import Link from 'next/link'
import { getStrapiMedia } from '../lib/api'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import dynamic from 'next/dynamic'
const CardContent = dynamic(() => import('./card-content'))

const Card = ({ project, width, category, path, link = true, image = false, description = false, portrait = false, className }) => {
  const imageObject = project.collectionImage
  let thumbnail = null
  if (project.collectionImage) {
    const url = (project.collectionImage.formats === null || Object.keys(project.collectionImage.formats).length === 0) ? project.collectionImage : project.collectionImage.formats.small
    thumbnail = getStrapiMedia(url)
  }

  let ratio = 'aspect-ratio--8x5 aspect-ratio--8x5-l '
  let margin = 'mt3'
  let padding = 'ph2-ns ph3-l pb3 pb5-l'
  if (width === 'w-third') {
    // ratio = 'aspect-ratio--3x4'
    margin = 'mt3'
    padding = 'ph2-ns ph4-l pb4 pb5-l'
  }
  if (description) ratio = 'aspect-ratio--3x4 aspect-ratio--3x4-l'
  if (portrait) ratio = 'aspect-ratio--3x4 aspect-ratio--3x4-l'
  let isCat = false
  if (description) isCat = true
  if (project.categories) isCat = category ? (project.categories.length > 0 ? project.categories.find(c => c.name === category.name) : null) : true
  if (project.tags) isCat = category ? (project.tags.length > 0 ? project.tags.find(c => c.name === category.name) : null) : true

  return (
    <>
      {link &&
        <LazyMotion features={domAnimation}>
          {isCat &&
            <Link scroll={false} as={`${path}/${project.slug}`} href={`${path}/[id]`}>
              <m.div
                className={`project-card details ${padding} white w-100 w-third-ns ${width}-l pointer ${className}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0, duration: 0.5 }}
              >
                <CardContent link width={width} project={project} thumbnail={thumbnail} margin={margin} ratio={ratio} category={category} image={image} imageObject={imageObject} description={description} />
              </m.div>
            </Link>}
        </LazyMotion>}
      {!link &&
        <span className={`project-card details ${padding} white w-100 w-third-ns ${width}-l`}>
          <CardContent width={width} project={project} thumbnail={thumbnail} margin={margin} ratio={ratio} category={category} image={image} imageObject={imageObject} description={description} />
        </span>}
    </>
  )
}

export default Card
