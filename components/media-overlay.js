import React from 'react'
import playButton from '../assets/play.svg'

const MediaOverlay = ({ show }) => {
  return (
    <div className={`image-overlay absolute w-100 h-100 o-80 flex flex-row white ${show}`}>
      <img src={playButton} className='w-80 w-30-ns' />
    </div>
  )
}

export default MediaOverlay
