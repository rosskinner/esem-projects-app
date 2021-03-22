
import React from 'react'
import { getStrapiMedia } from '../lib/api'

const Thumbnail = ({ item, className }) => {
  const thumbnail = getStrapiMedia(item.collectionImage.formats ? item.collectionImage.formats.thumbnail : item.collectionImage)

  return (
    <div className={`thumbnail justify-center flex ${className}`}>
      <img src={thumbnail} className='relative w-100 justify-center center contain' />
    </div>
  // <div className='aspect-ratio---object' />
  )
}

export default Thumbnail
