import React from 'react'
import playButton from '../assets/play.svg'

const MediaOverlay = ({ show, onClick, play }) => {
  return (
    <div className={`image-overlay absolute w-100 h-100 o-80  flex flex-row white ${show}`} onClick={onClick}>
      <img alt='play' src={playButton} className='w-30 center' />
    </div>
  )
}

export default MediaOverlay
