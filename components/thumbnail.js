
import { getStrapiMedia } from '../lib/api'

const Thumbnail = ({ item, className }) => {
  const thumbnail = getStrapiMedia(item.collectionImage.formats ? item.collectionImage.formats.thumbnail : item.collectionImage)

  return (
    <div className={`thumbnail justify-center flex ${className}`}>
      {item.link &&
        <a className='relative w-100 justify-center flex' href={item.link} rel='noreferrer' target='_blank'>
          <img src={thumbnail} alt={item.collectionImage.alternativeText || item.collectionImage.name} className='relative w-100 justify-center center contain' />
        </a>}
      {!item.link &&
        <img src={thumbnail} alt={item.collectionImage.alternativeText || item.collectionImage.name} className='relative w-100 justify-center center contain' />}

    </div>
  // <div className='aspect-ratio---object' />
  )
}

export default Thumbnail
